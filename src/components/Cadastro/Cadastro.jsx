import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTabs } from "../../redux/actions/tabsSlice";

export default function Cadastro() {
  const dispatch = useDispatch();
  const tabs = useSelector((state) => state.tabs);

  useEffect(() => {
    dispatch(newTabs(["listTab", "addTab"]));
    console.log(tabs);
  }, []);

  return (
    <div>
      <div>
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              role="tab"
              data-bs-toggle="tab"
              href="#tab-1"
            >
              Tab 1
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" role="tab" data-bs-toggle="tab" href="#tab-2">
              Tab 2
            </a>
          </li>
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
