class OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[ show update destroy ]

  # GET /organizations
  def index
    @organizations = Organization.all

    render json: @organizations
  end

  # GET /organizations/1
  def show
    render json: @organization
  end

  # POST /organizations
  def create
    @organization = Organization.new(organization_params)

    if @organization.save
      render json: @organization, status: :created, location: @organization
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /organizations/1
  def update
    if @organization.update(organization_params)
      render json: @organization
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  # DELETE /organizations/1
  def destroy
    @organization.destroy
  end

  def contract
    @user = Account.find(params[:user_id])
    @organization = Organization.find(params[:id])
    @organization.students << @user.student

    respond_to do |format|
      format.docx do
        # Initialize DocxReplace with your template
        doc = DocxReplace::Doc.new("#{Rails.root}/lib/docx_templates/my_template_contract.docx", "#{Rails.root}/tmp")

        # Replace some variables. $var$ convention is used here, but not required.
         doc.replace("NAME", @organization.name)
         doc.replace("START", @user.student.practice.start_date)
         doc.replace("END", @user.student.practice.end_date)
         doc.replace("FIO", @user.student.last_name + " " + @user.student.first_name + " " + @user.student.patronymic)

        # Write the document back to a temporary file
        tmp_file = Tempfile.new('word_template_contract', "#{Rails.root}/tmp")
        doc.commit(tmp_file.path)

        # Respond to the request by sending the temp file
        send_file tmp_file.path, filename: "#{@user.student.last_name}_договор.docx", type: "application/docx", disposition: 'attachment'
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_organization
      @organization = Organization.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def organization_params
      params.require(:organization).permit(:name, :email, :address, :description)
    end
end
