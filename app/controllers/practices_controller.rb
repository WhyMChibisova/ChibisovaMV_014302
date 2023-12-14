class PracticesController < ApplicationController
  before_action :set_practice, only: %i[ show update destroy ]

  # GET /practices
  def index
    @practices = Practice.all

    @groups = Array.new
    Student.all.each do |student|
      @groups << student.group_number
    end
    @groups.uniq!

    render json: {
      practices: @practices,
      groups: @groups}
  end

  # GET /practices/1
  def show
    render json: {
      practice: @practice,
      students: @practice.students
    }
  end

  # # GET /practices/new
  # def new
  #   @practice = Practice.new
  # end
  #
  # # GET /practices/1/edit
  # def edit
  # end

  # POST /practices
  def create
    @practice = Practice.new(practice_params)
    @students = Student.where('group_number like ?', @practice.group_number)
    @practice.students << @students

    if @practice.save
      render json: @practice, status: :created, location: @practice
    else
      render json: @practice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /practices/1
  def update
    if @practice.update(practice_params)
      @students = Student.where('group_number like ?', @practice.group_number)
      @practice.students.clear
      @practice.students << @students
      render json: @practice
    else
      render json: @practice.errors, status: :unprocessable_entity
    end
  end

  # DELETE /practices/1
  def destroy
    @practice.destroy
  end

  def report
    @user = Account.find(params[:user_id])
    @practice = Practice.find(params[:id])
    sent = 0
    arrived = 0
    late = 0
    not_arrived = 0
    @practice.students.each do |student|
      sent += 1
      if student.status == "Не прибыл на предприятие"
        not_arrived += 1
      elsif student.status == "Опоздал на предприятие"
        late += 1
      else student.status == "Прибыл на предприятие" || "Доработка приказа"
        arrived += 1
      end
    end

    respond_to do |format|
      format.docx do
        # Initialize DocxReplace with your template
        doc = DocxReplace::Doc.new("#{Rails.root}/lib/docx_templates/my_template.docx", "#{Rails.root}/tmp")

        # Replace some variables. $var$ convention is used here, but not required.
        doc.replace("SENT", sent)
        doc.replace("ARRIVED", arrived)
        doc.replace("LATE", late)
        doc.replace("NOT_ARRIVED", not_arrived)

        # Write the document back to a temporary file
        tmp_file = Tempfile.new('word_template', "#{Rails.root}/tmp")
        doc.commit(tmp_file.path)

        # Respond to the request by sending the temp file
        send_file tmp_file.path, filename: "#{@user.last_name}_докладная_записка.docx", disposition: 'attachment'
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_practice
      @practice = Practice.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def practice_params
      params.require(:practice).permit(:kind, :group_number, :duration, :hours_per_student, :start_date, :end_date)
    end
end
