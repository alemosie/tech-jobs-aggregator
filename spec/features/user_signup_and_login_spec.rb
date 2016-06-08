require 'rails_helper'

describe "Visiting the feed page" do
  it "has the title text" do
    visit "/"
    expect(page).to have_content("Where the Tech At?")
  end
end
