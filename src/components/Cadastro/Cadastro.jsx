import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";
import TableComponent from "../Table/Table";
import Table from "../Table/Table";


export default function Cadastro() {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const selectedTab = useSelector((state) => state.tabs.selectedTab);

  return (
    <div>
      <div>
        <ul class="nav nav-tabs" role="tablist">
          {tabs.map((tab, index) => {
            return (
              <li class="nav-item" role="presentation">
                <a
                  class={
                    selectedTab == tab.name ? "nav-link active" : "nav-link"
                  }
                  role="tab"
                  data-bs-toggle="tab"
                  href="#tab-1"
                  onClick={() => dispatch(selectTab(tab.name))}
                >
                  {tab.name}
                </a>
              </li>
            );
          })}
        </ul>
        <div class="tab-content">
          {tabs.map((tab, index) => {
            return (
              <div
                class={
                  selectedTab == tab.name
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                role="tabpanel"
                data-bs-parent="#myTabContent"
              >
                {tab.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
