import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import SingleFoodItem from "./SingleFoodItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ScrollableItems() {
  const [value, setValue] = React.useState(0);

  const apiData = useSelector(
    (state) => state.foodDeliveryStore.foodApiData
  );

  // console.log(
  //   "🚀 ~ file: ScrollableItems.js ~ line 47 ~ ScrollableItems ~ apiData",
  //   apiData
  // );

  const handleChange = (event, newValue) => {
    // console.log("newValue", newValue)
    setValue(newValue);
  };

  return (
    <>
      {apiData?.map((item, keyIndex) => {
      
        return (
          <Box sx={{ width: "100%" }} key={keyIndex}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={false}
                textColor="primary"
                indicatorColor="primary"
                aria-label="basic tabs example"
              >
                {
                  item?.table_menu_list?.map((subItem, index) => {
                    return <Tab label = {`${subItem?.menu_category}`} {...a11yProps(index)} key={index} />
                  })
                }
              </Tabs>
            </Box>
            
            {item?.table_menu_list?.map((subItem, index) => {
            return  <TabPanel value={value} key={index} index={index} sx={{padding: 0}} disableGutters>
                        { subItem?.category_dishes?.map((item, index) => {
                          return <SingleFoodItem foodItems={item} key={index} />
                        })
                        }
                    </TabPanel>
              })
            }

              {/* <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={4}>
                Item Three
              </TabPanel> */}

          </Box>
        );
      })}
    </>
  );
}
