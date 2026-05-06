import LoadingState from "../ui/LoadingState";

function RouteLoading() {
  return (
    <LoadingState
      type="default"
      title="Loading..."
      message="Please wait while we prepare the page."
      fullPage
    />
  );
}

export default RouteLoading;
