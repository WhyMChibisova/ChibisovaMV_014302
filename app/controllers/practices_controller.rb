class PracticesController < ApplicationController
  before_action :set_practice, only: %i[ show edit update destroy ]

  # GET /practices
  def index
    @practices = Practice.all
  end

  # GET /practices/1
  def show
  end

  # GET /practices/new
  def new
    @practice = Practice.new
  end

  # GET /practices/1/edit
  def edit
  end

  # POST /practices
  def create
    @practice = Practice.new(practice_params)

    if @practice.save
      redirect_to @practice, notice: "Practice was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /practices/1
  def update
    if @practice.update(practice_params)
      redirect_to @practice, notice: "Practice was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /practices/1
  def destroy
    @practice.destroy
    redirect_to practices_url, notice: "Practice was successfully destroyed.", status: :see_other
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_practice
      @practice = Practice.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def practice_params
      params.require(:practice).permit(:kind, :duration, :hours_per_student)
    end
end
