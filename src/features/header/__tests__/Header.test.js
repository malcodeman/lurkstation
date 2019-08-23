import React from "react";
import { Provider } from "react-redux";
import { shallow } from "enzyme";

import store from "../../../core/state/store";
import Header from "../components/Header";

describe("<Header />", () => {
  it("Renders header", () => {
    const component = shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(component.length).toEqual(1);
  });
});
