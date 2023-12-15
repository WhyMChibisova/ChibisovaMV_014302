class DocumentsController < ApplicationController
  before_action :set_document, only: %i[ show update destroy ]

  # GET /documents
  def index
    @documents = Document.all

    documents_with_student = @documents.map do |document|
      document.as_json.merge(student: document.student)
    end

    render json: documents_with_student
  end

  # GET /documents/1
  def show
    if @document.document.attached?
      render json: {
        document: @document.as_json.merge(document_url: url_for(@document.document)),
        student: @document.student
      }
    else
      render json: {
        document: @document,
        student: @document.student
      }
    end
  end

  # # GET /documents/new
  # def new
  #   @document = Document.new
  # end

  # # GET /documents/1/edit
  # def edit
  # end

  # POST /documents
  def create
    @document = Document.new(document_params)
    @account = Account.find(@document.student_id)
    @account.student.documents << @document

    if @document.created_at > @account.student.practice.start_date + 432000
      @account.student.status = "Опоздал на предприятие"
      @account.student.save
    end

    if @document.save
      render json: @document, status: :created, location: @document
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /documents/1
  def update
    @account = Account.find(params[:user_id])
    if @account.role == "teacher" || @account.role == "teacher_report"
      @document.student.status = "Прибыл на предприятие"
      @document.student.save
    end
    if @document.update(document_params)
      render json: @document
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  # DELETE /documents/1
  def destroy
    @document.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_document
      @document = Document.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def document_params
      params.require(:document).permit(:mark, :comment, :student_id, :document)
    end
end
