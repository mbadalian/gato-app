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

  const menuClass = classnames("menu", {
    hidden: !(isOpen && items.length),
  });

  return (
    <div className="wrapper">
      <div>
        <Input placeholder="Choose cat breed" {...getInputProps()} />
      </div>
      <ul className={menuClass} {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              className={classnames(
                highlightedIndex === index && "highlighted-index",
                selectedItem === item && "selected-item",
                "item"
              )}
              key={`${item.name}${index}`}
              {...getItemProps({ item, index })}
            >
              <span>{item.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
