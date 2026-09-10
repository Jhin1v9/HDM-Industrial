import { useState } from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuantityStepper } from "@/features/request/controls";

const labels = {
  decrease: "Reducir cantidad",
  increase: "Aumentar cantidad",
  input: "Cantidad de profesionales",
};

function StepperHarness({
  initial = 5,
  min,
  max,
}: {
  initial?: number;
  min?: number;
  max?: number;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div>
      <output data-testid="current">{value}</output>
      <QuantityStepper value={value} onChange={setValue} labels={labels} min={min} max={max} />
    </div>
  );
}

describe("QuantityStepper", () => {
  it("renders decrement button, input and increment button with aria labels", () => {
    render(<StepperHarness />);
    expect(screen.getByRole("button", { name: labels.decrease })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: labels.increase })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: labels.input })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: labels.input })).toBeInTheDocument();
  });

  it("increments and decrements the value", () => {
    render(<StepperHarness initial={5} />);
    fireEvent.click(screen.getByRole("button", { name: labels.increase }));
    expect(screen.getByTestId("current")).toHaveTextContent("6");
    fireEvent.click(screen.getByRole("button", { name: labels.decrease }));
    fireEvent.click(screen.getByRole("button", { name: labels.decrease }));
    expect(screen.getByTestId("current")).toHaveTextContent("4");
  });

  it("clamps at the minimum (default 1)", () => {
    render(<StepperHarness initial={1} />);
    fireEvent.click(screen.getByRole("button", { name: labels.decrease }));
    expect(screen.getByTestId("current")).toHaveTextContent("1");
  });

  it("clamps at the maximum (default 500)", () => {
    render(<StepperHarness initial={500} />);
    fireEvent.click(screen.getByRole("button", { name: labels.increase }));
    expect(screen.getByTestId("current")).toHaveTextContent("500");
  });

  it("respects custom min/max bounds", () => {
    render(<StepperHarness initial={10} min={10} max={12} />);
    fireEvent.click(screen.getByRole("button", { name: labels.decrease }));
    expect(screen.getByTestId("current")).toHaveTextContent("10");
    fireEvent.click(screen.getByRole("button", { name: labels.increase }));
    fireEvent.click(screen.getByRole("button", { name: labels.increase }));
    fireEvent.click(screen.getByRole("button", { name: labels.increase }));
    expect(screen.getByTestId("current")).toHaveTextContent("12");
  });

  it("clamps direct input above the maximum", () => {
    render(<StepperHarness initial={5} />);
    fireEvent.change(screen.getByRole("textbox", { name: labels.input }), { target: { value: "9999" } });
    expect(screen.getByTestId("current")).toHaveTextContent("500");
  });

  it("clamps direct input below the minimum", () => {
    render(<StepperHarness initial={5} min={2} />);
    fireEvent.change(screen.getByRole("textbox", { name: labels.input }), { target: { value: "0" } });
    expect(screen.getByTestId("current")).toHaveTextContent("2");
  });
});
