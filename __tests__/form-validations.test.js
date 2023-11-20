import { describe, expect, it } from "@jest/globals";
import { isInSomeSubgroups } from "../src/utils/validations/form-validations";

describe("test form validations", () => {
  it("test with one subgroup with invalid values", () => {
    let subgroups = [
      {
        name: "test",
        min: 231,
        max: 250,
      },
    ];
    const supplied = 230;

    expect(isInSomeSubgroups(supplied, subgroups)).toBe(
      "Insira um valor conforme os intervalos ao lado"
    );
  });

  it("test with two subgroups and valid values and valid greater max", () => {
    let subgroups = [
      {
        name: "test",
        min: 10,
        max: 220,
      },
      {
        name: "other",
        min: 20,
        max: 220,
      },
    ];
    const supplied = 220;

    expect(isInSomeSubgroups(supplied, subgroups)).toBe(true);
  });
});
