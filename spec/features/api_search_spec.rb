require 'rails_helper'

describe "Searching for job posts" do

  it "renders a job post feed", js: true do
    visit feed_path
    fill_in "skill", with: "sql"
    fill_in "zip", with: "11233"
    click_on "Find a job!"
    expect(page).to have_content("Found")
    #expect( first(".job") ).not_to be_nil
  end

end
