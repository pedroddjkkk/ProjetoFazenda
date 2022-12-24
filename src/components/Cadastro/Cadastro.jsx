import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTabs, selectTab } from "../../redux/actions/tabsSlice";

export default function Cadastro() {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs.tabs);
  const selectedTab = useSelector((state) => state.tabs.selectedTab);

  useEffect(() => {
    dispatch(newTabs(["Listar", "Cadastrar"]));
  }, []);

  return (
    <div>
      <div>
        <ul class="nav nav-tabs" role="tablist">
          {tabs.map((tab, index) => {
            return (
              <li class="nav-item" role="presentation">
                <a
                  class={selectedTab == tab ? "nav-link active" : "nav-link"}
                  role="tab"
                  data-bs-toggle="tab"
                  href="#tab-1"
                  onClick={() => dispatch(selectTab(tab))}
                >
                  {tab}
                </a>
              </li>
            );
          })}
        </ul>
        <div class="tab-content">
          <div id="tab-1" class="tab-pane active" role="tabpanel">
            <p>Content for tab 1.</p>
          </div>
          <div id="tab-2" class="tab-pane" role="tabpanel">
            <p>Content for tab 2.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
