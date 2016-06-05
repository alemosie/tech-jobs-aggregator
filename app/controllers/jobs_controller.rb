class JobsController < ApplicationController

  def create
    @job = Job.new(job_params)
    @job.user = current_user
    if @job.save
      respond_to { |format| format.js }
    else
      # redirect with a flash message
      redirect_to feed_path
    end
  end

  def destroy
  end

  private

    def job_params
      params.require(:job).permit(:position, :url, :company, :location, :date_posted, :original_search_term)
    end

end
