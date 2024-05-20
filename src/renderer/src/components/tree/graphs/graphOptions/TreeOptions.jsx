import React, { useContext, useRef, useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { SplitButton } from "primereact/splitbutton";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { SelectButton } from "primereact/selectbutton";
import OptionsContext from "../../../../OptionsContext";

const TreeOptions = () => {

  const { options, setGraphTypeOption } = useContext(OptionsContext);

  const sizeOptions = [
    {
      name: "Compact",
      value: "compact"
    },
    {
      name: "Normal",
      value: "normal"
    }
  ];

  const filterOptions = [
    {
      label: "Reward",
      value: "reward"
    },
    {
      label: "Visits",
      value: "visits"
    }
  ];

  const applyFilterOptions = [
    {
      id: "filter-action",
      disabled: true,
      className: "filter-menu-item filter-menu-header",
      template: () => renderOption({ type: "header", label: "Filter Types" })
    },
    {
      id: "highlight",
      className: "filter-menu-item",
      template: () => renderOption({ type: "radio", label: "Highlight", value: "highlight" })
    },
    {
      id: "collapse",
      className: "filter-menu-item",
      template: () => renderOption({ type: "radio", label: "Collapse", value: "collapse" })
    },
    {
      separator: true,
    },
    {
      id: "clear",
      className: "filter-menu-item",
      template: () => renderOption({ type: "clear" })
    }
  ];

  const renderOption = (item) => {
    return (
      <div className="p-menuitem-content" onClick={(e) => handleFilterMenuClick(e, item)}>
        <a className="flex align-items-center p-menuitem-link">
          {item.type === "header" && <span className="filter-menu-header">{item.label}</span>}
          {item.type === "radio" && (
            <div className="filter-menu-radio">
              <RadioButton
                checked={options.treeOptions.filterType === item.value}
              />
              <span>{item.label}</span>
            </div>
          )}
          {item.type === "clear" && (
            <div className="filter-menu-clear">
              <span>Clear Filters</span>
            </div>
          )}
        </a>
      </div>
    )
  };

  const handleFilterMenuClick = (e, item) => {
    if (item.type === "radio") {
      setFilterType(e, item.value);
    }
    if (item.type === "clear") {
      setGraphTypeOption("tree", "clearFilters", true)
    }
  };

  const setSize = (size) => {
    setGraphTypeOption("tree", "size", size);
  };

  const setFilterType = (e, type) => {
    e.stopPropagation();
    setGraphTypeOption("tree", "filterType", type);
  };

  return (
    <>
      <div>
        <label className="control-label" htmlFor="size">
          Tree size
        </label>
        <SelectButton
          id="size"
          allowEmpty={false}
          value={options.treeOptions.size}
          options={sizeOptions}
          optionLabel="name"
          onChange={(e) => setSize(e.value)}
        />
      </div>
      <div>
        <label className="control-label" htmlFor="filter">
          Filtering
        </label>
        <div className="filter-options">
          <Dropdown
            value={options.treeOptions.filterTarget}
            onChange={(e) => setGraphTypeOption("tree", "filterTarget", e.value)}
            variant="filled"
            options={filterOptions}
          />
          <label className="filter-label">in top</label>
          <InputMask
            value={options.treeOptions.filterValue}
            onComplete={(e) => {
              setGraphTypeOption("tree", "filterValue", e.value)
            }}
            mask="99%"
            unmask={true}
            size={1}
            placeholder="50%"
          />
        </div>
      </div>
      <SplitButton
        label="Apply Filter"
        className="filter-apply"
        model={applyFilterOptions}
        onClick={() => setGraphTypeOption("tree", "applyFilter", true)}
      />
    </>
  )
}

export default TreeOptions;
