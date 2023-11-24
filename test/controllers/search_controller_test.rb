require "test_helper"

class SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get organizations" do
    get search_organizations_url
    assert_response :success
  end
end
