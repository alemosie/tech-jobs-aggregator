class JobsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def create
    binding.pry
    @job = Job.new(job_params)
    @job.user = current_user
    if @job.save
      respond_to { |format| format.js }
    else
      # redirect with a flash error message
      redirect_to feed_path
    end
  end

  def destroy
    @job = Job.find(params[:id]).destroy
    respond_to { |format| format.js }
  end

  private

    def job_params
      params.require(:job).permit(:position, :url, :company, :location, :date_posted, :original_search_term)
    end

end
