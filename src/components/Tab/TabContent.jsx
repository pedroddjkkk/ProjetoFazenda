import { Children } from "react";
import { useSelector } from "react-redux";

export default function TabContent({ id, children }){
  const selectedTab = useSelector((state) => state.tabs.selectedTab);

  if(id == selectedTab) {
    return (
      <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
        {children}
      </div>
    );
  } else {
    return (
      <div className="tab-pane fade" id="tab-1" role="tabpanel">
        {children}
      </div>
    );
  }
}