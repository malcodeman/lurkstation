import React from "react";
import { shallow } from "enzyme";

import Header from "../components/Header";

describe("<Header />", () => {
  it("Renders header", () => {
    const component = shallow(<Header />);

    expect(component.length).toEqual(1);
  });
});
