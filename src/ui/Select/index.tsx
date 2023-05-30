import React, { useState, InputHTMLAttributes } from "react";
import classnames from "classnames";
import "./index.css";
import { Input } from "../Input";
import { useCombobox } from "downshift";
import { Button } from "../Button";

interface Props {
  value?: string;
  items: any[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const Select: React.FC<Props> = ({ items }) => {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items,
    itemToString(item) {
      return item ? item.title : "";
    },
  });

  return (
    <div className="wrapper">
      <div>
        <label {...getLabelProps()}>Choose your favorite book:</label>
        <div>
          <Input placeholder="Best book ever" {...getInputProps()} />
          <Button
            aria-label="toggle menu"
            type="button"
            {...getToggleButtonProps()}
          >
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </Button>
        </div>
      </div>
      <ul
        className={`${!(isOpen && items.length) && "hidden"}`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={classnames(
                highlightedIndex === index && "bg-blue-300",
                selectedItem === item && "font-bold",
                "py-2 px-3 shadow-sm flex flex-col"
              )}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.title}</span>
              <span>{item.author}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
