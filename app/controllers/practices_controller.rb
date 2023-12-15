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
    organizations = Array.new
    @practice.students.each do |student|
      organizations << student.organization
      sent += 1
      if student.status == "Не прибыл на предприятие"
        not_arrived += 1
      elsif student.status == "Опоздал на предприятие"
        late += 1
      else student.status == "Прибыл на предприятие" || "Доработка приказа"
        arrived += 1
      end
    end

    organizations.uniq!

    respond_to do |format|
      format.docx do
        # Initialize DocxReplace with your template
        doc = DocxReplace::Doc.new("#{Rails.root}/lib/docx_templates/my_template_report.docx", "#{Rails.root}/tmp")

        len = 0
        organizations.each do |organization|
          len += 1
          sent1 = 0
          arrived1 = 0
          late1 = 0
          not_arrived1 = 0
          organization.students.each do |student|
            if student.group_number == @practice.group_number
              sent1 += 1
              if student.status == "Не прибыл на предприятие"
                not_arrived1 += 1
              elsif student.status == "Опоздал на предприятие"
                late1 += 1
              else student.status == "Прибыл на предприятие" || "Доработка приказа"
                arrived1 += 1
              end
            end
          end

          doc.replace("PLACE#{len}", organization.name)
          doc.replace("S#{len}", sent1)
          doc.replace("AR#{len}", arrived1)
          doc.replace("L#{len}", late1)
          doc.replace("NOT_#{len}", not_arrived1)
        end

        while len < 31 do
          len += 1
          doc.replace("PLACE#{len}", "")
          doc.replace("S#{len}", "")
          doc.replace("AR#{len}", "")
          doc.replace("L#{len}", "")
          doc.replace("NOT_#{len}", "")
        end

        # Replace some variables. $var$ convention is used here, but not required.
        doc.replace("START", @practice.start_date)
        doc.replace("SENT", sent)
        doc.replace("ARRIVED", arrived)
        doc.replace("LATE", late)
        doc.replace("NOT_ARRIVED", not_arrived)

        # Write the document back to a temporary file
        tmp_file = Tempfile.new('word_template', "#{Rails.root}/tmp")
        doc.commit(tmp_file.path)

        # Respond to the request by sending the temp file
        send_file tmp_file.path, filename: "#{@user.teacher.last_name}_докладная_записка.docx", type: "application/docx", disposition: 'attachment'
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
