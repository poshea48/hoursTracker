import React from "react";

describe("<Header />", () => {
  it("should display todays day and date", () => {
    const Today = new window.Date().toDateString();
  });
});
