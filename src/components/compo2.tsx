import { useState } from "react";
import {Collapse , List , ListItem , ListItemIcon , ListItemText, Typography , Checkbox } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

//Example for Departments
const departmentsData = [
  {
    id: 1,
    department: "customer_service",
    sub_departments: [
      { id: 101, name: "support" },
      { id: 102, name: "customer_success" },
    ],
  },
  {
    id: 2,
    department: "design",
    sub_departments: [
      { id: 201, name: "graphic_design" },
      { id: 202, name: "product_design" },
      { id: 203, name: "web_design" },
    ],
  },
];

export const SecondComponent = () => {

  const [open, setOpen] = useState<number | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<{ [key: number]: boolean }>({});
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<{ [key: number]: boolean }>({});

  //If department is then close and vice versa
  const handleToggle = (departmentId: number) => {
    if (open === departmentId) {
      setOpen(null);
    } else {
      setOpen(departmentId);
    }
  };

  //Department selection logic
  const handleDepartmentSelect = (departmentId: number, subDepartments: { id: number }[]) => {
    const newSelectedDepartments = { ...selectedDepartments };
    const newSelectedSubDepartments = { ...selectedSubDepartments };

    //if parent department is selected then select all subdepartments
    if (newSelectedDepartments[departmentId]) {
      delete newSelectedDepartments[departmentId];
      subDepartments.forEach((subDept) => delete newSelectedSubDepartments[subDept.id]);
    } else {
      newSelectedDepartments[departmentId] = true;
      subDepartments.forEach((subDept) => newSelectedSubDepartments[subDept.id] = true);
    }

    //Update value for state
    setSelectedDepartments(newSelectedDepartments);
    setSelectedSubDepartments(newSelectedSubDepartments);
  };

  //SubDepartment selection logic
  const handleSubDepartmentSelect = (departmentId: number, subDepartmentId: number, subDepartments: { id: number }[]) => {
    const newSelectedSubDepartments = { ...selectedSubDepartments };

    if (newSelectedSubDepartments[subDepartmentId]) {
      delete newSelectedSubDepartments[subDepartmentId];
    } else {
      newSelectedSubDepartments[subDepartmentId] = true;
    }

    //Get value for all selected subdepartments
    const allSubDepartmentsSelected = subDepartments.every((subDept) => newSelectedSubDepartments[subDept.id]);
    const newSelectedDepartments = { ...selectedDepartments };

    //if all subdepartment is selected then select parent departments
    if (allSubDepartmentsSelected) {
      newSelectedDepartments[departmentId] = true;
    } else {
      delete newSelectedDepartments[departmentId];
    }

    //Update value for state
    setSelectedDepartments(newSelectedDepartments);
    setSelectedSubDepartments(newSelectedSubDepartments);
  };



  return (
    <List component="nav" sx={{height: 300, width: '40%', margin: '5%'}}>
       <Typography variant="h6">
          Component 2
        </Typography>
      {departmentsData.map((department) => (
        <div key={department.id}>
          <ListItem onClick={() => handleToggle(department.id)}>
            {" "}
            <ListItemIcon>
            <Checkbox
                edge="start"
                checked={selectedDepartments[department.id] || false}
                tabIndex={-1}
                disableRipple
                onClick={(e) => {
                  e.stopPropagation();
                  handleDepartmentSelect(department.id, department.sub_departments || []);
                }}
              />
            </ListItemIcon>
            <ListItemText primary={department.department} />
            {open === department.id ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === department.id} timeout="auto" unmountOnExit>
            <List component="div">
              {(department.sub_departments || []).map((subDept) => (
                <ListItem key={subDept.id}>
                  <ListItemIcon>
                  <Checkbox
                      edge="start"
                      checked={selectedSubDepartments[subDept.id] || false}
                      tabIndex={-1}
                      disableRipple
                      onClick={() => handleSubDepartmentSelect(department.id, subDept.id, department.sub_departments)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
}