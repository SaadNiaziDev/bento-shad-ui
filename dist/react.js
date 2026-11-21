"use client";
/*! bento-shad-ui v0.2.0 | MIT | https://github.com/SaadNiaziDev/bento-shad-ui */

// src/react/layout.tsx
import * as React2 from "react";

// src/react/utils.ts
import * as React from "react";
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
function flag(on) {
  return on ? "" : void 0;
}
function composeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") ref.current = node;
    }
  };
}
function childRef(child) {
  const fromProps = child.props.ref;
  return fromProps ?? child.ref;
}
var Slot = React.forwardRef(function Slot2({ children, ...slotProps }, ref) {
  if (!React.isValidElement(children)) return null;
  const child = children;
  const childProps = child.props;
  const merged = { ...slotProps, ...childProps };
  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];
    if (/^on[A-Z]/.test(key) && typeof slotValue === "function" && typeof childValue === "function") {
      merged[key] = (...args) => {
        childValue(...args);
        slotValue(...args);
      };
    }
  }
  merged.className = cx(slotProps.className, childProps.className) || void 0;
  if (slotProps.style || childProps.style) merged.style = { ...slotProps.style, ...childProps.style };
  merged.ref = composeRefs(ref, childRef(child));
  return React.cloneElement(child, merged);
});
function useControllableState(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== void 0;
  const current = controlled ? value : inner;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const set = React.useCallback(
    (next) => {
      if (!controlled) setInner(next);
      onChangeRef.current?.(next);
    },
    [controlled]
  );
  return [current, set];
}
function useSafeId(prefix = "bk") {
  const id = React.useId();
  return `${prefix}-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}
function part(tag, base, displayName) {
  const Component = React.forwardRef(function Part(props, ref) {
    const { className, ...rest } = props;
    return React.createElement(tag, { ...rest, ref, className: cx(base, className) });
  });
  Component.displayName = displayName;
  return Component;
}
function popoverTargetProps(id) {
  return React.version.startsWith("18") ? { popovertarget: id } : { popoverTarget: id };
}

// src/react/layout.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var BentoGrid = React2.forwardRef(function BentoGrid2({ cols = 4, className, containerClassName, ...props }, ref) {
  return /* @__PURE__ */ jsx("div", { className: cx("bk-bento", containerClassName), children: /* @__PURE__ */ jsx("div", { ref, className: cx("bk-bento-grid", className), "data-cols": cols === 4 ? void 0 : cols, ...props }) });
});
var Tile = React2.forwardRef(function Tile2({ span = 1, rows = 1, tone = "default", interactive, center, as = "div", asChild, className, ...props }, ref) {
  const attrs = {
    className: cx("bk-tile", span !== 1 && (span === "full" ? "bk-span-full" : `bk-span-${span}`), rows !== 1 && `bk-row-${rows}`, className),
    "data-tone": tone === "default" ? void 0 : tone,
    "data-interactive": flag(interactive),
    "data-center": flag(center)
  };
  if (asChild) return /* @__PURE__ */ jsx(Slot, { ref, ...attrs, ...props });
  const Tag = as;
  return /* @__PURE__ */ jsx(Tag, { ref, ...attrs, ...props });
});
var TileHeader = part("div", "bk-tile-header", "TileHeader");
var TileTitle = part("h3", "bk-tile-title", "TileTitle");
var TileDescription = part("p", "bk-tile-description", "TileDescription");
var TileFooter = part("div", "bk-tile-footer", "TileFooter");
var TileMedia = part("div", "bk-tile-media", "TileMedia");
var Eyebrow = part("span", "bk-eyebrow", "Eyebrow");
var Card = part("div", "bk-card", "Card");
var CardHeader = part("div", "bk-card-header", "CardHeader");
var CardTitle = part("h3", "bk-card-title", "CardTitle");
var CardDescription = part("p", "bk-card-description", "CardDescription");
var CardAction = part("div", "bk-card-action", "CardAction");
var CardContent = part("div", "bk-card-content", "CardContent");
var CardFooter = part("div", "bk-card-footer", "CardFooter");
var Stack = React2.forwardRef(function Stack2({ gap, className, style, ...props }, ref) {
  return /* @__PURE__ */ jsx("div", { ref, className: cx("bk-stack", className), style: gap === void 0 ? style : { ...style, ["--gap"]: `${gap}px` }, ...props });
});
var Row = React2.forwardRef(function Row2({ gap, between, className, style, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cx("bk-row", between && "bk-between", className),
      style: gap === void 0 ? style : { ...style, ["--gap"]: `${gap}px` },
      ...props
    }
  );
});
var Separator = React2.forwardRef(function Separator2({ orientation = "horizontal", className, ...props }, ref) {
  return /* @__PURE__ */ jsx("hr", { ref, className: cx("bk-separator", className), "data-orientation": orientation === "vertical" ? "vertical" : void 0, "aria-orientation": orientation, ...props });
});
var Media = React2.forwardRef(function Media2({ ratio, caption, className, style, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs("div", { ref, className: cx("bk-media", className), style: ratio === void 0 ? style : { ...style, ["--ratio"]: String(ratio) }, ...props, children: [
    children,
    caption ? /* @__PURE__ */ jsx("span", { className: "bk-media-caption", children: caption }) : null
  ] });
});

// src/react/actions.tsx
import * as React3 from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Spinner = React3.forwardRef(function Spinner2({ size = "default", label = "Loading", className, ...props }, ref) {
  return /* @__PURE__ */ jsx2(
    "span",
    {
      ref,
      className: cx("bk-spinner", className),
      "data-size": size === "default" ? void 0 : size,
      role: label ? "status" : void 0,
      "aria-label": label || void 0,
      "aria-hidden": label ? void 0 : true,
      ...props
    }
  );
});
var Button = React3.forwardRef(function Button2({ variant = "default", size = "default", loading = false, block = false, asChild = false, className, children, disabled, type, ...props }, ref) {
  const attrs = {
    className: cx("bk-button", className),
    "data-variant": variant === "default" ? void 0 : variant,
    "data-size": size === "default" ? void 0 : size,
    "data-loading": flag(loading),
    "data-block": flag(block)
  };
  if (asChild) {
    return /* @__PURE__ */ jsx2(Slot, { ref, ...attrs, ...props, children });
  }
  return /* @__PURE__ */ jsxs2("button", { ref, type: type ?? "button", disabled: disabled || loading, "aria-busy": loading || void 0, ...attrs, ...props, children: [
    loading ? /* @__PURE__ */ jsx2(Spinner, { size: "sm", label: "" }) : null,
    children
  ] });
});
var ButtonGroup = React3.forwardRef(function ButtonGroup2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx2("div", { ref, role: "group", className: cx("bk-button-group", className), ...props });
});
var ToggleGroupContext = React3.createContext(null);
var Toggle = React3.forwardRef(function Toggle2({ pressed, defaultPressed = false, onPressedChange, variant = "default", value, className, onClick, type, ...props }, ref) {
  const group = React3.useContext(ToggleGroupContext);
  const [own, setOwn] = useControllableState(pressed, defaultPressed, onPressedChange);
  const isOn = group && value !== void 0 ? group.isPressed(value) : own;
  return /* @__PURE__ */ jsx2(
    "button",
    {
      ref,
      type: type ?? "button",
      className: cx("bk-toggle", className),
      "data-variant": variant === "outline" ? "outline" : void 0,
      "data-bk-react": "",
      "aria-pressed": isOn,
      onClick: (event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (group && value !== void 0) group.toggle(value);
        else setOwn(!own);
      },
      ...props
    }
  );
});
var ToggleGroup = React3.forwardRef(function ToggleGroup2(props, ref) {
  const { type, value, defaultValue, onValueChange, className, children, ...rest } = props;
  const [current, setCurrent] = useControllableState(value, defaultValue ?? (type === "single" ? "" : []), onValueChange);
  const ctx = React3.useMemo(
    () => ({
      isPressed: (v) => Array.isArray(current) ? current.includes(v) : current === v,
      toggle: (v) => {
        if (type === "single") setCurrent(v);
        else {
          const list = Array.isArray(current) ? current : [];
          setCurrent(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
        }
      }
    }),
    [current, setCurrent, type]
  );
  return /* @__PURE__ */ jsx2(ToggleGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx2("div", { ref, role: "group", className: cx("bk-toggle-group", className), "data-type": type, "data-bk-react": "", ...rest, children }) });
});
var Kbd = part("kbd", "bk-kbd", "Kbd");
var KbdGroup = part("span", "bk-kbd-group", "KbdGroup");
function Tooltip({ content, side = "top", children }) {
  return /* @__PURE__ */ jsx2(Slot, { "data-bk-tooltip": content, "data-bk-tooltip-side": side === "bottom" ? "bottom" : void 0, children });
}

// src/react/forms.tsx
import * as React4 from "react";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var Label = React4.forwardRef(function Label2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx3("label", { ref, className: cx("bk-label", className), ...props });
});
function Field({ label, description, error, required, id, className, children }) {
  const generated = useSafeId("field");
  const childProps = children.props;
  const controlId = id ?? childProps.id ?? generated;
  const descriptionId = description ? `${controlId}-description` : void 0;
  const errorId = error ? `${controlId}-error` : void 0;
  const control = React4.cloneElement(children, {
    id: controlId,
    "aria-describedby": cx(childProps["aria-describedby"], descriptionId, errorId) || void 0,
    "aria-invalid": error ? true : childProps["aria-invalid"],
    required: required ?? childProps.required
  });
  return /* @__PURE__ */ jsxs3("div", { className: cx("bk-field", className), children: [
    label ? /* @__PURE__ */ jsxs3(Label, { htmlFor: controlId, children: [
      label,
      required ? /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: " *" }) : null
    ] }) : null,
    control,
    description ? /* @__PURE__ */ jsx3("p", { id: descriptionId, className: "bk-field-description", children: description }) : null,
    error ? /* @__PURE__ */ jsx3("p", { id: errorId, className: "bk-field-error", children: error }) : null
  ] });
}
var Input = React4.forwardRef(function Input2({ invalid, className, ...props }, ref) {
  return /* @__PURE__ */ jsx3("input", { ref, className: cx("bk-input", className), "aria-invalid": invalid || props["aria-invalid"] || void 0, ...props });
});
var Textarea = React4.forwardRef(function Textarea2({ invalid, className, ...props }, ref) {
  return /* @__PURE__ */ jsx3("textarea", { ref, className: cx("bk-textarea", className), "aria-invalid": invalid || props["aria-invalid"] || void 0, ...props });
});
var Select = React4.forwardRef(function Select2({ invalid, className, ...props }, ref) {
  return /* @__PURE__ */ jsx3("select", { ref, className: cx("bk-select", className), "aria-invalid": invalid || props["aria-invalid"] || void 0, ...props });
});
var InputGroup = React4.forwardRef(function InputGroup2({ icon, end, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs3("div", { ref, className: cx("bk-input-group", className), ...props, children: [
    icon ? /* @__PURE__ */ jsx3("span", { className: "bk-input-start", "aria-hidden": "true", children: icon }) : null,
    children,
    end ? /* @__PURE__ */ jsx3("span", { className: "bk-input-end", children: end }) : null
  ] });
});
function OptionRow({ control, label, description, className }) {
  if (!label) return /* @__PURE__ */ jsx3(Fragment2, { children: control });
  return /* @__PURE__ */ jsxs3("label", { className: cx("bk-option", className), children: [
    control,
    /* @__PURE__ */ jsxs3("span", { className: "bk-option-text", children: [
      /* @__PURE__ */ jsx3("span", { children: label }),
      description ? /* @__PURE__ */ jsx3("span", { children: description }) : null
    ] })
  ] });
}
var Checkbox = React4.forwardRef(function Checkbox2({ indeterminate, label, description, className, onChange, onCheckedChange, ...props }, ref) {
  const inner = React4.useRef(null);
  React4.useEffect(() => {
    if (inner.current) inner.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  const control = /* @__PURE__ */ jsx3(
    "input",
    {
      ref: composeRefs(ref, inner),
      type: "checkbox",
      className: cx("bk-checkbox", !label && className),
      onChange: (e) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      },
      ...props
    }
  );
  return /* @__PURE__ */ jsx3(OptionRow, { control, label, description, className: label ? className : void 0 });
});
var Radio = React4.forwardRef(function Radio2({ label, description, className, ...props }, ref) {
  const group = React4.useContext(RadioGroupContext);
  const groupProps = group && props.value !== void 0 ? { name: group.name, checked: group.value === String(props.value), onChange: () => group.setValue(String(props.value)) } : {};
  const control = /* @__PURE__ */ jsx3("input", { ref, type: "radio", className: cx("bk-radio", !label && className), ...props, ...groupProps });
  return /* @__PURE__ */ jsx3(OptionRow, { control, label, description, className: label ? className : void 0 });
});
var RadioGroupContext = React4.createContext(null);
var RadioGroup = React4.forwardRef(function RadioGroup2({ legend, value, defaultValue = "", onValueChange, name, className, children, ...props }, ref) {
  const generated = useSafeId("radio");
  const [current, setCurrent] = useControllableState(value, defaultValue, onValueChange);
  const ctx = React4.useMemo(() => ({ name: name ?? generated, value: current, setValue: setCurrent }), [name, generated, current, setCurrent]);
  return /* @__PURE__ */ jsx3(RadioGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxs3("fieldset", { ref, className: cx("bk-radio-group", className), ...props, children: [
    legend ? /* @__PURE__ */ jsx3("legend", { className: "bk-label", style: { marginBottom: 4 }, children: legend }) : null,
    children
  ] }) });
});
var ChoiceCard = React4.forwardRef(function ChoiceCard2({ type = "radio", label, description, aside, className, ...props }, ref) {
  const group = React4.useContext(RadioGroupContext);
  const groupProps = type === "radio" && group && props.value !== void 0 ? { name: group.name, checked: group.value === String(props.value), onChange: () => group.setValue(String(props.value)) } : {};
  return /* @__PURE__ */ jsxs3("label", { className: cx("bk-choice", className), children: [
    /* @__PURE__ */ jsx3("input", { ref, type, className: type === "radio" ? "bk-radio" : "bk-checkbox", ...props, ...groupProps }),
    /* @__PURE__ */ jsxs3("span", { className: "bk-option-text", children: [
      /* @__PURE__ */ jsx3("span", { children: label }),
      description ? /* @__PURE__ */ jsx3("span", { children: description }) : null
    ] }),
    aside ? /* @__PURE__ */ jsx3("span", { className: "bk-choice-price", children: aside }) : null
  ] });
});
var Switch = React4.forwardRef(function Switch2({ tone = "default", label, description, className, onChange, onCheckedChange, ...props }, ref) {
  const control = /* @__PURE__ */ jsx3(
    "input",
    {
      ref,
      type: "checkbox",
      role: "switch",
      className: cx("bk-switch", !label && className),
      "data-tone": tone === "brand" ? "brand" : void 0,
      onChange: (e) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      },
      ...props
    }
  );
  if (!label) return control;
  return /* @__PURE__ */ jsxs3("label", { className: cx("bk-switch-row", className), children: [
    /* @__PURE__ */ jsxs3("span", { className: "bk-option-text", children: [
      /* @__PURE__ */ jsx3("span", { children: label }),
      description ? /* @__PURE__ */ jsx3("span", { children: description }) : null
    ] }),
    control
  ] });
});
var Slider = React4.forwardRef(function Slider2({ value, defaultValue, onValueChange, min = 0, max = 100, step = 1, className, style, ...props }, ref) {
  const [current, setCurrent] = useControllableState(value, defaultValue ?? min, onValueChange);
  const percent = (current - min) / (max - min || 1) * 100;
  return /* @__PURE__ */ jsx3(
    "input",
    {
      ref,
      type: "range",
      className: cx("bk-slider", className),
      min,
      max,
      step,
      value: current,
      "data-bk-react": "",
      style: { ...style, ["--val"]: `${percent}%` },
      onChange: (e) => setCurrent(Number(e.target.value)),
      ...props
    }
  );
});
var InputOTP = React4.forwardRef(function InputOTP2({ groups = [6], value, defaultValue = "", onValueChange, onComplete, disabled, className, ...props }, ref) {
  const length = groups.reduce((a, b) => a + b, 0);
  const [code, setCode] = useControllableState(value, defaultValue, onValueChange);
  const inputs = React4.useRef([]);
  const digits = Array.from({ length }, (_, i) => code[i] && code[i] !== " " ? code[i] : "");
  const commit = (next, focusIndex) => {
    const joined = next.map((d) => d || " ").join("").slice(0, length).replace(/\s+$/, "");
    setCode(joined);
    if (joined.length === length && !joined.includes(" ")) onComplete?.(joined);
    if (focusIndex !== void 0) inputs.current[Math.max(0, Math.min(focusIndex, length - 1))]?.focus();
  };
  let index = 0;
  return /* @__PURE__ */ jsx3("div", { ref, role: "group", className: cx("bk-otp", className), "data-bk-react": "", ...props, children: groups.map((size, g) => /* @__PURE__ */ jsxs3(React4.Fragment, { children: [
    g > 0 ? /* @__PURE__ */ jsx3("span", { className: "bk-otp-separator", "aria-hidden": "true" }) : null,
    /* @__PURE__ */ jsx3("div", { className: "bk-otp-group", children: Array.from({ length: size }, () => {
      const i = index++;
      return /* @__PURE__ */ jsx3(
        "input",
        {
          ref: (el) => {
            inputs.current[i] = el;
          },
          inputMode: "numeric",
          autoComplete: i === 0 ? "one-time-code" : "off",
          maxLength: 1,
          disabled,
          "aria-label": `Digit ${i + 1} of ${length}`,
          value: digits[i],
          onChange: (e) => {
            const d = e.target.value.replace(/\D/g, "").slice(-1);
            const next = [...digits];
            next[i] = d;
            commit(next, d ? i + 1 : void 0);
          },
          onKeyDown: (e) => {
            if (e.key === "Backspace" && !digits[i] && i > 0) {
              e.preventDefault();
              const next = [...digits];
              next[i - 1] = "";
              commit(next, i - 1);
            } else if (e.key === "ArrowLeft") inputs.current[i - 1]?.focus();
            else if (e.key === "ArrowRight") inputs.current[i + 1]?.focus();
          },
          onPaste: (e) => {
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
            if (!pasted) return;
            e.preventDefault();
            const next = [...digits];
            [...pasted].forEach((d, k) => {
              if (i + k < length) next[i + k] = d;
            });
            commit(next, i + pasted.length);
          }
        },
        i
      );
    }) })
  ] }, g)) });
});
var Dropzone = React4.forwardRef(function Dropzone2({ title = "Drop files or click to upload", hint, icon, onFiles, onChange, className, ...props }, ref) {
  const [names, setNames] = React4.useState("");
  const [over, setOver] = React4.useState(false);
  return /* @__PURE__ */ jsxs3(
    "label",
    {
      className: cx("bk-dropzone", className),
      "data-dragover": flag(over),
      "data-bk-react": "",
      onDragEnter: () => setOver(true),
      onDragOver: () => setOver(true),
      onDragLeave: () => setOver(false),
      onDrop: () => setOver(false),
      children: [
        /* @__PURE__ */ jsx3(
          "input",
          {
            ref,
            type: "file",
            onChange: (e) => {
              onChange?.(e);
              const files = Array.from(e.target.files ?? []);
              setNames(files.map((f) => f.name).join(", "));
              onFiles?.(files);
            },
            ...props
          }
        ),
        icon,
        /* @__PURE__ */ jsx3("span", { className: "bk-small", children: title }),
        hint ? /* @__PURE__ */ jsx3("span", { className: "bk-caption", children: hint }) : null,
        names ? /* @__PURE__ */ jsx3("span", { className: "bk-dropzone-files", children: names }) : null
      ]
    }
  );
});

// src/react/display.tsx
import * as React5 from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var Badge = React5.forwardRef(function Badge2({ variant = "default", dot, className, ...props }, ref) {
  return /* @__PURE__ */ jsx4("span", { ref, className: cx("bk-badge", className), "data-variant": variant === "default" ? void 0 : variant, "data-dot": flag(dot), ...props });
});
var Avatar = React5.forwardRef(function Avatar2({ src, alt = "", fallback, size = "default", shape = "circle", status, className, children, ...props }, ref) {
  const [failed, setFailed] = React5.useState(false);
  const showImage = src && !failed;
  return /* @__PURE__ */ jsx4(
    "span",
    {
      ref,
      className: cx("bk-avatar", className),
      "data-size": size === "default" ? void 0 : size,
      "data-shape": shape === "square" ? "square" : void 0,
      "data-status": status,
      ...props,
      children: showImage ? /* @__PURE__ */ jsx4("img", { src, alt, onError: () => setFailed(true) }) : fallback ?? children
    }
  );
});
var AvatarGroup = part("span", "bk-avatar-group", "AvatarGroup");
var Table = React5.forwardRef(function Table2({ wrapperClassName, className, ...props }, ref) {
  return /* @__PURE__ */ jsx4("div", { className: cx("bk-table-wrap", wrapperClassName), children: /* @__PURE__ */ jsx4("table", { ref, className: cx("bk-table", className), ...props }) });
});
var TableHeader = part("thead", "", "TableHeader");
var TableBody = part("tbody", "", "TableBody");
var TableFooter = part("tfoot", "", "TableFooter");
var TableRow = part("tr", "", "TableRow");
var TableCaption = part("caption", "", "TableCaption");
var TableHead = React5.forwardRef(
  function TableHead2({ align, ...props }, ref) {
    return /* @__PURE__ */ jsx4("th", { ref, scope: props.scope ?? "col", "data-align": align === "end" ? "end" : void 0, ...props });
  }
);
var TableCell = React5.forwardRef(function TableCell2({ align, ...props }, ref) {
  return /* @__PURE__ */ jsx4("td", { ref, "data-align": align === "end" ? "end" : void 0, ...props });
});
var List = part("ul", "bk-list", "List");
var ListItem = React5.forwardRef(function ListItem2({ leading, title, description, meta, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs4("li", { ref, className: cx("bk-list-item", className), ...props, children: [
    leading,
    /* @__PURE__ */ jsxs4("div", { className: "bk-list-item-text", children: [
      /* @__PURE__ */ jsx4("span", { children: title }),
      description ? /* @__PURE__ */ jsx4("span", { children: description }) : null
    ] }),
    meta ? /* @__PURE__ */ jsx4("span", { className: "bk-list-item-meta", children: meta }) : null,
    children
  ] });
});
var Stat = React5.forwardRef(function Stat2({ label, value, delta, trend = "flat", icon, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs4("div", { ref, className: cx("bk-stat", className), ...props, children: [
    /* @__PURE__ */ jsxs4("span", { className: "bk-stat-label", children: [
      icon,
      label
    ] }),
    /* @__PURE__ */ jsx4("span", { className: "bk-stat-value", children: value }),
    delta ? /* @__PURE__ */ jsx4("span", { className: "bk-stat-delta", "data-trend": trend === "flat" ? void 0 : trend, children: delta }) : null,
    children
  ] });
});
function sparklinePoints(data, width = 100, height = 32, padding = 2) {
  if (data.length === 0) return [];
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : 0;
  return data.map((v, i) => [
    round(data.length > 1 ? i * step : width / 2),
    round(padding + (1 - (v - min) / span) * (height - padding * 2))
  ]);
}
function round(n) {
  return Math.round(n * 100) / 100;
}
var Sparkline = React5.forwardRef(function Sparkline2({ data, label, area = true, endpoint = true, className, ...props }, ref) {
  const points = sparklinePoints(data);
  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const last = points[points.length - 1];
  return /* @__PURE__ */ jsxs4("svg", { ref, className: cx("bk-spark", className), viewBox: "0 0 100 32", preserveAspectRatio: "none", role: "img", "aria-label": label, ...props, children: [
    area && points.length > 1 ? /* @__PURE__ */ jsx4("polygon", { points: `${line} 100,32 0,32` }) : null,
    /* @__PURE__ */ jsx4("polyline", { points: line }),
    endpoint && last ? /* @__PURE__ */ jsx4("circle", { cx: last[0], cy: last[1], r: "2.5" }) : null
  ] });
});
function barHeights(data, max) {
  const top = max ?? Math.max(0, ...data.map((d) => d.value));
  return data.map((d) => top > 0 ? round(Math.max(0, Math.min(100, d.value / top * 100))) : 0);
}
var BarChart = React5.forwardRef(function BarChart2({ data, max, highlight = "max", height = 160, formatValue = String, color, className, ...props }, ref) {
  const heights = barHeights(data, max);
  const maxIndex = data.reduce((best, d, i, arr) => d.value > (arr[best]?.value ?? -Infinity) ? i : best, 0);
  const emphasised = highlight === "max" ? maxIndex : highlight === "none" ? -1 : highlight;
  const summary = data.map((d) => `${d.label} ${formatValue(d.value)}`).join(", ");
  return /* @__PURE__ */ jsxs4("div", { ref, className: cx("bk-chart", className), role: "img", "aria-label": props["aria-label"] ?? summary, ...props, children: [
    /* @__PURE__ */ jsx4("div", { className: "bk-bars", style: { ["--h"]: `${height}px`, ...color ? { ["--bar"]: color } : {} }, children: data.map((d, i) => /* @__PURE__ */ jsx4(
      "div",
      {
        className: "bk-bar",
        style: { ["--v"]: `${heights[i]}%` },
        "data-value": formatValue(d.value),
        "data-muted": flag(emphasised !== -1 && i !== emphasised),
        "data-show": flag(i === emphasised)
      },
      `${d.label}-${i}`
    )) }),
    /* @__PURE__ */ jsx4("div", { className: "bk-bar-labels", "aria-hidden": "true", children: data.map((d, i) => /* @__PURE__ */ jsx4("span", { children: d.label }, `${d.label}-${i}`)) })
  ] });
});
function Legend({ items, className }) {
  return /* @__PURE__ */ jsx4("div", { className: cx("bk-legend", className), children: items.map((item, i) => /* @__PURE__ */ jsx4("span", { style: { ["--c"]: item.color }, children: item.label }, i)) });
}
var Meter = React5.forwardRef(function Meter2({ segments, total = 100, className, ...props }, ref) {
  const summary = segments.map((s) => `${s.label} ${round(s.value / total * 100)}%`).join(", ");
  return /* @__PURE__ */ jsx4("div", { ref, className: cx("bk-meter", className), role: "img", "aria-label": props["aria-label"] ?? summary, ...props, children: segments.map((s, i) => /* @__PURE__ */ jsx4("span", { style: { ["--v"]: `${round(s.value / total * 100)}%`, ["--c"]: s.color } }, i)) });
});
var Progress = React5.forwardRef(function Progress2({ value, max = 100, tone = "default", label, className, ...props }, ref) {
  const percent = Math.max(0, Math.min(100, value / max * 100));
  return /* @__PURE__ */ jsx4(
    "div",
    {
      ref,
      className: cx("bk-progress", className),
      "data-tone": tone === "default" ? void 0 : tone,
      role: "progressbar",
      "aria-label": label,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuenow": value,
      ...props,
      children: /* @__PURE__ */ jsx4("span", { style: { ["--v"]: `${percent}%` } })
    }
  );
});
var Ring = React5.forwardRef(function Ring2({ value, size, thickness, color, label, className, style, children, ...props }, ref) {
  const clamped = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ jsx4(
    "div",
    {
      ref,
      className: cx("bk-ring", className),
      role: "img",
      "aria-label": label,
      style: {
        ...style,
        ["--p"]: String(clamped),
        ...size ? { ["--size"]: `${size}px` } : {},
        ...thickness ? { ["--w"]: `${thickness}px` } : {},
        ...color ? { ["--ring-color"]: color } : {}
      },
      ...props,
      children: /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: children ?? `${Math.round(clamped)}%` })
    }
  );
});
var Skeleton = React5.forwardRef(function Skeleton2({ width, height = 12, circle, className, style, ...props }, ref) {
  return /* @__PURE__ */ jsx4(
    "span",
    {
      ref,
      className: cx("bk-skeleton", className),
      "aria-hidden": "true",
      style: { width, height, ...circle ? { borderRadius: "50%" } : {}, ...style },
      ...props
    }
  );
});
var Alert = React5.forwardRef(function Alert2({ variant = "default", icon, title, actions, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      ref,
      className: cx("bk-alert", className),
      "data-variant": variant === "default" ? void 0 : variant,
      role: variant === "destructive" ? "alert" : "status",
      ...props,
      children: [
        /* @__PURE__ */ jsx4("span", { className: "bk-alert-icon", "aria-hidden": "true", children: icon }),
        title ? /* @__PURE__ */ jsx4("div", { className: "bk-alert-title", children: title }) : null,
        children ? /* @__PURE__ */ jsx4("div", { className: "bk-alert-description", children }) : null,
        actions ? /* @__PURE__ */ jsx4("div", { className: "bk-alert-actions", children: actions }) : null
      ]
    }
  );
});
var Empty = React5.forwardRef(function Empty2({ icon, illustration, title, description, actions, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs4("div", { ref, className: cx("bk-empty", className), ...props, children: [
    illustration ? /* @__PURE__ */ jsx4("div", { className: "bk-empty-illustration", children: illustration }) : null,
    icon ? /* @__PURE__ */ jsx4("span", { className: "bk-empty-icon", "aria-hidden": "true", children: icon }) : null,
    /* @__PURE__ */ jsx4("h4", { className: "bk-empty-title", children: title }),
    description ? /* @__PURE__ */ jsx4("p", { className: "bk-empty-description", children: description }) : null,
    actions ? /* @__PURE__ */ jsx4("div", { className: "bk-empty-actions", children: actions }) : null,
    children
  ] });
});
var Accordion = part("div", "bk-accordion", "Accordion");
var AccordionItem = React5.forwardRef(function AccordionItem2({ title, defaultOpen, onOpenChange, className, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs4(
    "details",
    {
      ref,
      className: cx("bk-accordion-item", className),
      open: props.open ?? defaultOpen,
      onToggle: (e) => onOpenChange?.(e.currentTarget.open),
      ...props,
      children: [
        /* @__PURE__ */ jsx4("summary", { className: "bk-accordion-trigger", children: title }),
        /* @__PURE__ */ jsx4("div", { className: "bk-accordion-content", children })
      ]
    }
  );
});

// src/react/navigation.tsx
import * as React6 from "react";
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function Chevron({ dir }) {
  return /* @__PURE__ */ jsx5("svg", { className: "bk-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx5("path", { d: dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6" }) });
}
function linkLike(base, { current, asChild, className, children, ...props }, ref, before, after) {
  const shared = { className: cx(base, className), "aria-current": current ? "page" : void 0 };
  if (asChild && React6.isValidElement(children)) {
    const child = children;
    return React6.cloneElement(child, {
      ...props,
      ...shared,
      className: cx(shared.className, child.props.className),
      children: /* @__PURE__ */ jsxs5(Fragment4, { children: [
        before,
        child.props.children,
        after
      ] })
    });
  }
  return /* @__PURE__ */ jsxs5("a", { ref, ...props, ...shared, children: [
    before,
    children,
    after
  ] });
}
var TabsContext = React6.createContext(null);
function useTabs(component) {
  const ctx = React6.useContext(TabsContext);
  if (!ctx) throw new Error(`<${component}> must be used inside <Tabs>.`);
  return ctx;
}
var slug = (value) => value.replace(/[^a-zA-Z0-9_-]/g, "-");
var Tabs = React6.forwardRef(function Tabs2({ value, defaultValue = "", onValueChange, className, ...props }, ref) {
  const [current, setCurrent] = useControllableState(value, defaultValue, onValueChange);
  const baseId = useSafeId("tabs");
  const ctx = React6.useMemo(() => ({ value: current, setValue: setCurrent, baseId }), [current, setCurrent, baseId]);
  return /* @__PURE__ */ jsx5(TabsContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx5("div", { ref, className, "data-bk-react": "", ...props }) });
});
var TabsList = React6.forwardRef(function TabsList2({ variant = "pill", full, className, onKeyDown, ...props }, ref) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      ref,
      role: "tablist",
      className: cx("bk-tabs-list", className),
      "data-variant": variant === "line" ? "line" : void 0,
      "data-full": full ? "" : void 0,
      onKeyDown: (e) => {
        onKeyDown?.(e);
        const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]:not(:disabled)'));
        const i = tabs.indexOf(document.activeElement);
        if (i < 0) return;
        const next = e.key === "ArrowRight" ? tabs[(i + 1) % tabs.length] : e.key === "ArrowLeft" ? tabs[(i - 1 + tabs.length) % tabs.length] : e.key === "Home" ? tabs[0] : e.key === "End" ? tabs[tabs.length - 1] : void 0;
        if (next) {
          e.preventDefault();
          next.focus();
          next.click();
        }
      },
      ...props
    }
  );
});
var TabsTrigger = React6.forwardRef(function TabsTrigger2({ value, className, onClick, ...props }, ref) {
  const ctx = useTabs("TabsTrigger");
  const selected = ctx.value === value;
  return /* @__PURE__ */ jsx5(
    "button",
    {
      ref,
      type: "button",
      role: "tab",
      id: `${ctx.baseId}-tab-${slug(value)}`,
      "aria-controls": `${ctx.baseId}-panel-${slug(value)}`,
      "aria-selected": selected,
      tabIndex: selected ? 0 : -1,
      className: cx("bk-tabs-trigger", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) ctx.setValue(value);
      },
      ...props
    }
  );
});
var TabsContent = React6.forwardRef(function TabsContent2({ value, forceMount, className, ...props }, ref) {
  const ctx = useTabs("TabsContent");
  const selected = ctx.value === value;
  if (!selected && !forceMount) return null;
  return /* @__PURE__ */ jsx5(
    "div",
    {
      ref,
      role: "tabpanel",
      id: `${ctx.baseId}-panel-${slug(value)}`,
      "aria-labelledby": `${ctx.baseId}-tab-${slug(value)}`,
      hidden: !selected,
      tabIndex: 0,
      className: cx("bk-tabs-content", className),
      ...props
    }
  );
});
var Breadcrumb = React6.forwardRef(function Breadcrumb2({ items, linkAs: LinkComponent = "a", className, ...props }, ref) {
  return /* @__PURE__ */ jsx5("nav", { ref, "aria-label": "Breadcrumb", className, ...props, children: /* @__PURE__ */ jsx5("ol", { className: "bk-breadcrumb", children: items.map((item, i) => {
    const last = i === items.length - 1;
    return /* @__PURE__ */ jsx5("li", { children: last || !item.href ? /* @__PURE__ */ jsx5("span", { "aria-current": last ? "page" : void 0, children: item.label }) : /* @__PURE__ */ jsx5(LinkComponent, { href: item.href, children: item.label }) }, i);
  }) }) });
});
function getPaginationRange(page, pageCount, siblingCount = 1) {
  const count = Math.max(0, Math.floor(pageCount));
  if (count === 0) return [];
  const current = Math.min(Math.max(1, Math.floor(page)), count);
  const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const slots = siblingCount * 2 + 5;
  if (count <= slots) return range(1, count);
  const left = Math.max(current - siblingCount, 1);
  const right = Math.min(current + siblingCount, count);
  const showLeft = left > 2;
  const showRight = right < count - 1;
  const edge = 3 + siblingCount * 2;
  if (!showLeft && showRight) return [...range(1, edge), "ellipsis", count];
  if (showLeft && !showRight) return [1, "ellipsis", ...range(count - edge + 1, count)];
  return [1, "ellipsis", ...range(left, right), "ellipsis", count];
}
var Pagination = React6.forwardRef(function Pagination2({ page, pageCount, onPageChange, siblingCount = 1, getHref, className, ...props }, ref) {
  const tokens = getPaginationRange(page, pageCount, siblingCount);
  const item = (target, content, extra = {}) => {
    const disabled = target < 1 || target > pageCount;
    if (getHref && !disabled) {
      return /* @__PURE__ */ jsx5("a", { className: "bk-pagination-link", href: getHref(target), onClick: () => onPageChange?.(target), ...extra, children: content });
    }
    return /* @__PURE__ */ jsx5("button", { type: "button", className: "bk-pagination-link", disabled, onClick: () => onPageChange?.(target), ...extra, children: content });
  };
  return /* @__PURE__ */ jsxs5("nav", { ref, "aria-label": "Pagination", className: cx("bk-pagination", className), ...props, children: [
    item(page - 1, /* @__PURE__ */ jsx5(Chevron, { dir: "left" }), { "aria-label": "Previous page" }),
    tokens.map(
      (t, i) => t === "ellipsis" ? /* @__PURE__ */ jsx5("span", { className: "bk-pagination-ellipsis", "aria-hidden": "true", children: "\u2026" }, `e${i}`) : /* @__PURE__ */ jsx5(React6.Fragment, { children: item(t, t, { "aria-current": t === page ? "page" : void 0, "aria-label": `Page ${t}` }) }, t)
    ),
    item(page + 1, /* @__PURE__ */ jsx5(Chevron, { dir: "right" }), { "aria-label": "Next page" })
  ] });
});
var Navbar = part("nav", "bk-navbar", "Navbar");
var NavbarLinks = part("div", "bk-navbar-links", "NavbarLinks");
var NavbarActions = part("div", "bk-navbar-actions", "NavbarActions");
var NavbarBrand = React6.forwardRef(function NavbarBrand2(props, ref) {
  return linkLike("bk-navbar-brand", props, ref);
});
var NavbarLink = React6.forwardRef(function NavbarLink2(props, ref) {
  return linkLike("bk-navbar-link", props, ref);
});
var Sidebar = part("nav", "bk-sidebar", "Sidebar");
var SidebarBrand = part("div", "bk-sidebar-brand", "SidebarBrand");
var SidebarLabel = part("div", "bk-sidebar-label", "SidebarLabel");
var SidebarFooter = part("div", "bk-sidebar-footer", "SidebarFooter");
var SidebarItem = React6.forwardRef(function SidebarItem2({ icon, badge, ...props }, ref) {
  return linkLike("bk-sidebar-item", props, ref, icon, badge);
});
var BottomNav = part("nav", "bk-bottom-nav", "BottomNav");
var BottomNavItem = React6.forwardRef(function BottomNavItem2({ icon, ...props }, ref) {
  return linkLike("bk-bottom-nav-item", props, ref, icon);
});

// src/react/calendar.tsx
import * as React7 from "react";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function isSameDay(a, b) {
  return !!a && !!b && toDateKey(a) === toDateKey(b);
}
function getMonthGrid(year, month, weekStartsOn = 1) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(year, month, 1 - offset + i);
    return { date, outside: date.getMonth() !== (month % 12 + 12) % 12, key: toDateKey(date) };
  });
}
var Calendar = React7.forwardRef(function Calendar2(props, ref) {
  const {
    mode = "single",
    value,
    defaultValue = null,
    onValueChange,
    month,
    defaultMonth,
    onMonthChange,
    today = /* @__PURE__ */ new Date(),
    weekStartsOn = 1,
    locale,
    isDisabled,
    className,
    ...rest
  } = props;
  const [selected, setSelected] = useControllableState(
    value,
    defaultValue,
    onValueChange
  );
  const initialMonth = defaultMonth ?? (selected instanceof Date ? selected : selected?.from) ?? today ?? /* @__PURE__ */ new Date();
  const [shown, setShown] = useControllableState(month, initialMonth, onMonthChange);
  const year = shown.getFullYear();
  const monthIndex = shown.getMonth();
  const days = React7.useMemo(() => getMonthGrid(year, monthIndex, weekStartsOn), [year, monthIndex, weekStartsOn]);
  const title = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(shown);
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const dayLabel = new Intl.DateTimeFormat(locale, { dateStyle: "full" });
  const weekdays = days.slice(0, 7).map((d) => weekdayFormat.format(d.date).slice(0, 2));
  const range = mode === "range" && selected && !(selected instanceof Date) ? selected : null;
  const from = range?.from ?? null;
  const to = range?.to ?? null;
  const choose = (date) => {
    if (mode !== "range") {
      setSelected(date);
      return;
    }
    if (!from || to) setSelected({ from: date });
    else if (date < from) setSelected({ from: date, to: from });
    else setSelected({ from, to: date });
  };
  const rangeState = (date) => {
    if (!from) return void 0;
    const end = to ?? from;
    const key = toDateKey(date);
    if (key < toDateKey(from) || key > toDateKey(end)) return void 0;
    if (isSameDay(from, end)) return "single";
    if (isSameDay(date, from)) return "start";
    if (isSameDay(date, end)) return "end";
    return "middle";
  };
  const step = (delta) => setShown(new Date(year, monthIndex + delta, 1));
  return /* @__PURE__ */ jsxs6("div", { ref, className: cx("bk-calendar", className), "data-mode": mode, "data-bk-react": "", ...rest, children: [
    /* @__PURE__ */ jsxs6("div", { className: "bk-calendar-head", children: [
      /* @__PURE__ */ jsx6(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Previous month", onClick: () => step(-1), children: /* @__PURE__ */ jsx6("svg", { className: "bk-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx6("path", { d: "m15 6-6 6 6 6" }) }) }),
      /* @__PURE__ */ jsx6("span", { className: "bk-calendar-title", "aria-live": "polite", children: title }),
      /* @__PURE__ */ jsx6(Button, { variant: "ghost", size: "icon-sm", "aria-label": "Next month", onClick: () => step(1), children: /* @__PURE__ */ jsx6("svg", { className: "bk-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx6("path", { d: "m9 6 6 6-6 6" }) }) })
    ] }),
    /* @__PURE__ */ jsxs6(
      "div",
      {
        className: "bk-calendar-grid",
        onKeyDown: (e) => {
          const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
          const delta = moves[e.key];
          if (delta === void 0) return;
          const buttons = Array.from(e.currentTarget.querySelectorAll(".bk-calendar-day"));
          const i = buttons.indexOf(document.activeElement);
          const next = buttons[i + delta];
          if (i >= 0 && next) {
            e.preventDefault();
            next.focus();
          }
        },
        children: [
          weekdays.map((w, i) => /* @__PURE__ */ jsx6("span", { className: "bk-calendar-weekday", "aria-hidden": "true", children: w }, i)),
          days.map((day) => {
            const single = mode !== "range" && selected instanceof Date && isSameDay(day.date, selected);
            const state = mode === "range" && !day.outside ? rangeState(day.date) : void 0;
            const pressed = single || state === "start" || state === "end" || state === "single";
            const disabled = day.outside || isDisabled?.(day.date) === true;
            return /* @__PURE__ */ jsx6(
              "button",
              {
                type: "button",
                className: "bk-calendar-day",
                "data-outside": day.outside ? "" : void 0,
                "data-today": today && isSameDay(day.date, today) ? "" : void 0,
                "data-range": state,
                "aria-pressed": pressed,
                "aria-label": dayLabel.format(day.date),
                disabled,
                tabIndex: day.outside ? -1 : 0,
                onClick: () => choose(day.date),
                children: day.date.getDate()
              },
              day.key
            );
          })
        ]
      }
    )
  ] });
});

// src/react/overlay.tsx
import * as React8 from "react";
import { enablePopoverPlacement } from "./index.js";
import { Fragment as Fragment5, jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
function CloseIcon() {
  return /* @__PURE__ */ jsx7("svg", { className: "bk-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx7("path", { d: "M18 6 6 18M6 6l12 12" }) });
}
function useModal(open, onOpenChange, closeOnBackdrop) {
  const ref = React8.useRef(null);
  React8.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);
  const handlers = {
    onClose: () => {
      if (open) onOpenChange(false);
    },
    onClick: (e) => {
      if (!closeOnBackdrop || e.target !== e.currentTarget) return;
      const r = e.currentTarget.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onOpenChange(false);
    }
  };
  return { ref, handlers };
}
function ModalContent({
  title,
  description,
  footer,
  hideClose,
  icon,
  titleId,
  descriptionId,
  onOpenChange,
  children,
  handle
}) {
  return /* @__PURE__ */ jsxs7(Fragment5, { children: [
    handle ? /* @__PURE__ */ jsx7("div", { className: "bk-sheet-handle", "aria-hidden": "true" }) : null,
    hideClose ? null : /* @__PURE__ */ jsx7(Button, { variant: "ghost", size: "icon-sm", className: "bk-dialog-close", "aria-label": "Close", onClick: () => onOpenChange(false), children: /* @__PURE__ */ jsx7(CloseIcon, {}) }),
    icon ? /* @__PURE__ */ jsx7("span", { className: "bk-dialog-icon", "aria-hidden": "true", children: icon }) : null,
    title || description ? /* @__PURE__ */ jsxs7("div", { className: "bk-dialog-header", children: [
      title ? /* @__PURE__ */ jsx7("h2", { className: "bk-dialog-title", id: titleId, children: title }) : null,
      description ? /* @__PURE__ */ jsx7("p", { className: "bk-dialog-description", id: descriptionId, children: description }) : null
    ] }) : null,
    children ? /* @__PURE__ */ jsx7("div", { className: "bk-dialog-body", children }) : null,
    footer ? /* @__PURE__ */ jsx7("div", { className: "bk-dialog-footer", children: footer }) : null
  ] });
}
var Dialog = React8.forwardRef(function Dialog2({ open, onOpenChange, title, description, footer, hideClose, closeOnBackdrop, variant = "default", icon, className, children, ...props }, forwarded) {
  const { ref, handlers } = useModal(open, onOpenChange, closeOnBackdrop ?? variant !== "alert");
  const titleId = useSafeId("dialog-title");
  const descriptionId = useSafeId("dialog-description");
  return /* @__PURE__ */ jsx7(
    "dialog",
    {
      ref: composeRefs(ref, forwarded),
      className: cx("bk-dialog", className),
      "data-variant": variant === "alert" ? "alert" : void 0,
      role: variant === "alert" ? "alertdialog" : void 0,
      "aria-labelledby": title ? titleId : void 0,
      "aria-describedby": description ? descriptionId : void 0,
      "data-bk-react": "",
      ...handlers,
      ...props,
      children: open ? /* @__PURE__ */ jsx7(ModalContent, { ...{ title, description, footer, hideClose, icon, titleId, descriptionId, onOpenChange }, hideClose: hideClose ?? variant === "alert", children }) : null
    }
  );
});
var Sheet = React8.forwardRef(function Sheet2({ open, onOpenChange, title, description, footer, hideClose, closeOnBackdrop = true, side = "right", className, children, ...props }, forwarded) {
  const { ref, handlers } = useModal(open, onOpenChange, closeOnBackdrop);
  const titleId = useSafeId("sheet-title");
  const descriptionId = useSafeId("sheet-description");
  return /* @__PURE__ */ jsx7(
    "dialog",
    {
      ref: composeRefs(ref, forwarded),
      className: cx("bk-sheet", className),
      "data-side": side === "bottom" ? "bottom" : void 0,
      "aria-labelledby": title ? titleId : void 0,
      "aria-describedby": description ? descriptionId : void 0,
      "data-bk-react": "",
      ...handlers,
      ...props,
      children: open ? /* @__PURE__ */ jsx7(ModalContent, { ...{ title, description, footer, titleId, descriptionId, onOpenChange }, hideClose: hideClose ?? side === "bottom", handle: side === "bottom", children }) : null
    }
  );
});
function usePopoverSurface(onOpen) {
  const ref = React8.useRef(null);
  const onOpenRef = React8.useRef(onOpen);
  onOpenRef.current = onOpen;
  React8.useEffect(() => {
    enablePopoverPlacement();
    const el = ref.current;
    if (!el) return;
    const onToggle = (e) => {
      if (e.newState === "open") onOpenRef.current?.(el);
    };
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, []);
  return ref;
}
var POPOVER_AUTO = { popover: "auto" };
function DropdownMenu({ trigger, align = "start", className, children, onKeyDown, ...props }) {
  const id = useSafeId("menu");
  const ref = usePopoverSurface((el) => el.querySelector('[role^="menuitem"]:not(:disabled)')?.focus());
  return /* @__PURE__ */ jsxs7(Fragment5, { children: [
    React8.cloneElement(trigger, { ...popoverTargetProps(id), "aria-haspopup": "menu" }),
    /* @__PURE__ */ jsx7(
      "div",
      {
        ref,
        id,
        ...POPOVER_AUTO,
        role: "menu",
        className: cx("bk-menu", className),
        "data-align": align,
        "data-bk-react": "",
        onKeyDown: (e) => {
          onKeyDown?.(e);
          const items = Array.from(e.currentTarget.querySelectorAll('[role^="menuitem"]:not(:disabled)'));
          const i = items.indexOf(document.activeElement);
          const next = e.key === "ArrowDown" ? items[(i + 1) % items.length] : e.key === "ArrowUp" ? items[(i - 1 + items.length) % items.length] : e.key === "Home" ? items[0] : e.key === "End" ? items[items.length - 1] : void 0;
          if (next) {
            e.preventDefault();
            next.focus();
          }
        },
        ...props,
        children
      }
    )
  ] });
}
function hideClosestPopover(el) {
  const popover = el.closest("[popover]");
  if (popover && typeof popover.hidePopover === "function") popover.hidePopover();
}
var DropdownMenuItem = React8.forwardRef(function DropdownMenuItem2({ icon, shortcut, variant = "default", onSelect, keepOpen, className, onClick, children, ...props }, ref) {
  return /* @__PURE__ */ jsxs7(
    "button",
    {
      ref,
      type: "button",
      role: "menuitem",
      className: cx("bk-menu-item", className),
      "data-variant": variant === "destructive" ? "destructive" : void 0,
      onClick: (e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        onSelect?.();
        if (!keepOpen) hideClosestPopover(e.currentTarget);
      },
      ...props,
      children: [
        icon,
        children,
        shortcut ? /* @__PURE__ */ jsx7("span", { className: "bk-menu-shortcut", children: shortcut }) : null
      ]
    }
  );
});
var DropdownMenuCheckboxItem = React8.forwardRef(function DropdownMenuCheckboxItem2({ checked, onCheckedChange, className, onClick, ...props }, ref) {
  return /* @__PURE__ */ jsx7(
    "button",
    {
      ref,
      type: "button",
      role: "menuitemcheckbox",
      "aria-checked": checked,
      className: cx("bk-menu-item", className),
      onClick: (e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onCheckedChange(!checked);
      },
      ...props
    }
  );
});
function DropdownMenuLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx7("div", { className: cx("bk-menu-label", className), ...props });
}
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx7("hr", { className: cx("bk-menu-separator", className), ...props });
}
function Popover({ trigger, align = "start", className, children, ...props }) {
  const id = useSafeId("popover");
  const ref = usePopoverSurface((el) => el.querySelector("input, select, textarea, button, [tabindex]")?.focus());
  return /* @__PURE__ */ jsxs7(Fragment5, { children: [
    React8.cloneElement(trigger, { ...popoverTargetProps(id), "aria-haspopup": "dialog" }),
    /* @__PURE__ */ jsx7("div", { ref, id, ...POPOVER_AUTO, role: "dialog", className: cx("bk-popover", className), "data-align": align, "data-bk-react": "", ...props, children })
  ] });
}
function closePopover(event) {
  hideClosestPopover(event.currentTarget);
}
function filterCommandGroups(groups, query) {
  const q = query.trim().toLowerCase();
  if (!q) return groups.map((g) => ({ heading: g.heading, items: [...g.items] }));
  return groups.map((g) => ({ heading: g.heading, items: g.items.filter((item) => `${item.label} ${(item.keywords ?? []).join(" ")}`.toLowerCase().includes(q)) })).filter((g) => g.items.length > 0);
}
function CommandBody({ groups, placeholder = "Type a command or search", emptyText = "No results.", onSelect, autoFocus }) {
  const [query, setQuery] = React8.useState("");
  const [active, setActive] = React8.useState(0);
  const listId = useSafeId("command-list");
  const listRef = React8.useRef(null);
  const visible = React8.useMemo(() => filterCommandGroups(groups, query), [groups, query]);
  const flat = React8.useMemo(() => visible.flatMap((g) => g.items.filter((i) => !i.disabled)), [visible]);
  React8.useEffect(() => setActive(0), [query]);
  React8.useEffect(() => {
    const el = listRef.current?.querySelector('[aria-selected="true"]');
    const list = listRef.current;
    if (!el || !list) return;
    const top = el.offsetTop - list.offsetTop;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (top + el.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = top + el.offsetHeight - list.clientHeight;
  }, [active]);
  const run = (item) => {
    if (!item || item.disabled) return;
    item.onSelect?.();
    onSelect?.(item);
  };
  const activeItem = flat[active];
  return /* @__PURE__ */ jsxs7(Fragment5, { children: [
    /* @__PURE__ */ jsxs7("div", { className: "bk-command-search", children: [
      /* @__PURE__ */ jsxs7("svg", { className: "bk-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx7("circle", { cx: "11", cy: "11", r: "7" }),
        /* @__PURE__ */ jsx7("path", { d: "m20 20-4.3-4.3" })
      ] }),
      /* @__PURE__ */ jsx7(
        "input",
        {
          className: "bk-command-input",
          placeholder,
          "aria-label": placeholder,
          role: "combobox",
          "aria-expanded": "true",
          "aria-controls": listId,
          "aria-activedescendant": activeItem ? `${listId}-${activeItem.id}` : void 0,
          autoFocus,
          value: query,
          onChange: (e) => setQuery(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => Math.min(i + 1, flat.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              run(activeItem);
            }
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "bk-command-list", role: "listbox", id: listId, ref: listRef, children: [
      visible.map((group) => /* @__PURE__ */ jsxs7("div", { className: "bk-command-group", role: "group", "aria-label": group.heading, children: [
        /* @__PURE__ */ jsx7("div", { className: "bk-command-group-heading", "aria-hidden": "true", children: group.heading }),
        group.items.map((item) => /* @__PURE__ */ jsxs7(
          "div",
          {
            id: `${listId}-${item.id}`,
            role: "option",
            "aria-selected": activeItem?.id === item.id,
            "aria-disabled": item.disabled || void 0,
            className: "bk-command-item",
            onMouseMove: () => {
              const i = flat.findIndex((f) => f.id === item.id);
              if (i >= 0 && i !== active) setActive(i);
            },
            onClick: () => run(item),
            children: [
              item.icon,
              item.label,
              item.shortcut ? /* @__PURE__ */ jsx7(KbdGroup, { children: item.shortcut.map((k) => /* @__PURE__ */ jsx7(Kbd, { children: k }, k)) }) : null
            ]
          },
          item.id
        ))
      ] }, group.heading)),
      visible.length === 0 ? /* @__PURE__ */ jsx7("div", { className: "bk-command-empty", children: emptyText }) : null
    ] })
  ] });
}
function Command({ className, ...props }) {
  return /* @__PURE__ */ jsx7("div", { className: cx("bk-command", className), "data-inline": "", "data-bk-react": "", children: /* @__PURE__ */ jsx7(CommandBody, { ...props }) });
}
function CommandDialog({ open, onOpenChange, hotkey = "k", className, onSelect, ...props }) {
  const { ref, handlers } = useModal(open, onOpenChange, true);
  const openRef = React8.useRef(open);
  openRef.current = open;
  React8.useEffect(() => {
    if (!hotkey) return;
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === hotkey.toLowerCase()) {
        e.preventDefault();
        onOpenChange(!openRef.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotkey, onOpenChange]);
  return /* @__PURE__ */ jsx7("dialog", { ref, className: cx("bk-command", className), "data-bk-react": "", "aria-label": props.placeholder ?? "Command palette", ...handlers, children: open ? /* @__PURE__ */ jsx7(
    CommandBody,
    {
      ...props,
      autoFocus: true,
      onSelect: (item) => {
        onSelect?.(item);
        onOpenChange(false);
      }
    }
  ) : null });
}

// src/react/theme.tsx
import * as React9 from "react";
import { getTheme, onThemeChange, resolveTheme, setTheme, themeScript } from "./index.js";
import { jsx as jsx8, jsxs as jsxs8 } from "react/jsx-runtime";
var subscribe = (callback) => onThemeChange(() => callback());
var getServerTheme = () => "system";
var getServerResolved = () => "light";
function useTheme() {
  const theme = React9.useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const resolvedTheme = React9.useSyncExternalStore(subscribe, () => resolveTheme(getTheme()), getServerResolved);
  return { theme, resolvedTheme, setTheme };
}
function ThemeScript({ nonce }) {
  return /* @__PURE__ */ jsx8("script", { nonce, dangerouslySetInnerHTML: { __html: themeScript } });
}
var ICONS = {
  light: /* @__PURE__ */ jsxs8("svg", { className: "bk-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx8("circle", { cx: "12", cy: "12", r: "4" }),
    /* @__PURE__ */ jsx8("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" })
  ] }),
  dark: /* @__PURE__ */ jsx8("svg", { className: "bk-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx8("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" }) }),
  system: /* @__PURE__ */ jsxs8("svg", { className: "bk-icon", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx8("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }),
    /* @__PURE__ */ jsx8("path", { d: "M8 21h8M12 17v4" })
  ] })
};
function ThemeToggle({ className, labels = {} }) {
  const { theme } = useTheme();
  const names = { light: "Light theme", dark: "Dark theme", system: "System theme", ...labels };
  return /* @__PURE__ */ jsx8("div", { role: "group", "aria-label": "Theme", className: cx("bk-toggle-group", className), "data-bk-react": "", children: ["light", "dark", "system"].map((t) => /* @__PURE__ */ jsx8("button", { type: "button", className: "bk-toggle", "aria-pressed": theme === t, "aria-label": names[t], onClick: () => setTheme(t), children: ICONS[t] }, t)) });
}

// src/react/illustration.tsx
import * as React10 from "react";
import { renderCharacter } from "./illustrations.js";
import { jsx as jsx9 } from "react/jsx-runtime";
var PencilCharacter = React10.forwardRef(function PencilCharacter2({ character, mood = "neutral", size = 160, label, className, style, ...props }, ref) {
  const idPrefix = useSafeId("ch");
  const svg = React10.useMemo(() => renderCharacter(character, mood, { idPrefix, title: label }), [character, mood, idPrefix, label]);
  return /* @__PURE__ */ jsx9(
    "span",
    {
      ref,
      className: cx("bk-illustration", className),
      style: { ...style, ["--size"]: `${size}px` },
      dangerouslySetInnerHTML: { __html: svg },
      ...props
    }
  );
});

// src/react/index.ts
import { characters, moods, renderCharacter as renderCharacter2 } from "./illustrations.js";
import { getTheme as getTheme2, onThemeChange as onThemeChange2, resolveTheme as resolveTheme2, setTheme as setTheme2, themeScript as themeScript2, toast, version as version2 } from "./index.js";
export {
  Accordion,
  AccordionItem,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  BarChart,
  BentoGrid,
  BottomNav,
  BottomNavItem,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  ChoiceCard,
  Command,
  CommandDialog,
  Dialog,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Dropzone,
  Empty,
  Eyebrow,
  Field,
  Input,
  InputGroup,
  InputOTP,
  Kbd,
  KbdGroup,
  Label,
  Legend,
  List,
  ListItem,
  Media,
  Meter,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarLinks,
  Pagination,
  PencilCharacter,
  Popover,
  Progress,
  Radio,
  RadioGroup,
  Ring,
  Row,
  Select,
  Separator,
  Sheet,
  Sidebar,
  SidebarBrand,
  SidebarFooter,
  SidebarItem,
  SidebarLabel,
  Skeleton,
  Slider,
  Slot,
  Sparkline,
  Spinner,
  Stack,
  Stat,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeScript,
  ThemeToggle,
  Tile,
  TileDescription,
  TileFooter,
  TileHeader,
  TileMedia,
  TileTitle,
  Toggle,
  ToggleGroup,
  Tooltip,
  barHeights,
  characters,
  closePopover,
  cx,
  filterCommandGroups,
  getMonthGrid,
  getPaginationRange,
  getTheme2 as getTheme,
  isSameDay,
  moods,
  onThemeChange2 as onThemeChange,
  renderCharacter2 as renderCharacter,
  resolveTheme2 as resolveTheme,
  setTheme2 as setTheme,
  sparklinePoints,
  themeScript2 as themeScript,
  toDateKey,
  toast,
  useControllableState,
  useTheme,
  version2 as version
};
