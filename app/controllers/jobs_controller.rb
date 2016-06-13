class JobsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @job = Job.new( job_params.merge(user: current_user) )
    if @job.save
      respond_to { |format| format.js }
    else
      redirect_to feed_path, alert: "Something went wrong."
    end
  end

  def destroy
    @job = Job.find(params[:id]).destroy
    respond_to { |format| format.js }
  end

  private

    def job_params
      params.require(:job).permit(:position, :url, :company, :location, :date_posted, :distance, :original_search_term)
    end

end
