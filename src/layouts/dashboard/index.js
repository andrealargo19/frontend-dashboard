
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import PieChart from "examples/Charts/PieChart";
import PolarChart from "examples/Charts/PolarChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";


// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import React, { useState, useEffect, useCallback, useRef } from 'react';

import Icon from "@mui/material/Icon";
import MDButton from "../../components/MDButton";
import { CSVLink } from "react-csv";

function Dashboard() {    
    //Total clientes
  const [countClients, setCountClients] = useState(0);
  const [countClientsPct, setCountClientsPct] = useState({
    color: "dark",
    amount: "",
    label: "",
    });

    //total sales
    const [totalSales, setTotalSales] = useState(0);
    const [totalSalesPct, setTotalSalesPct] = useState({
      color: "primary",
      amount: "",
      label: "",
    });

    //total sales last week
    const [salesLastWeek, setSalesLastWeek] = useState(0);
    const [lastWeekSalesPct, setLastWeeklSalesPct] = useState({
      color: "info",
      amount: "",
      label: "",});

    //total Sales last month
    const [salesLastMonth, setSalesLastMonth] = useState(0);
    const [salesLastMonthPct, setSalesLastMonthPct] = useState({
      color: "success",
      amount: "",
      label: "",
    });

    //new state excel
    const [dataExcel, setDataExcel] = useState([]);

    //pieDataset
    const [pieDataset, setPieDataset] = useState(
      {
      labels: [],
      datasets: {
      label: "",
      backgroundColors: ["warning"],
      data: []}
      });
  
    //Barchart
    const [Barchart, setBarchart] = useState(
    {
      labels: [],
      datasets: {
      label: "",
      data: []}
      });

    //PolarChart
    const [polarChart, setPolarChart] = useState(
      {

      labels: [],
      datasets: {
      label: "",
      backgroundColors: [],
      data: []}
          }

      );

    //lineChart
    const [lineChart, setLineChart] = useState(

      {
      labels: [],
      datasets: [

          {
        label: "",
        color:"",
        data:[]
          }
          ]
      }
      );

      //export CSV
    const [exportCsv, setExportCsv] = useState ([]);

    //token
      const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5ZTRkMWQ3Yy0yOTA3LTRmNTgtOWU3OC0zZTFmODIwMDljMWMiLCJuYW1lIjoidGVzdDEyIiwiaWF0IjoxNjQzMTIxMzQwLCJleHAiOjE2NDMxMjg1NDB9.NanNHjuDZQWB2MfR8YwsVfs7cEoPJwAy_wOnbqKIC50';
    

      const getInfoBack = useCallback(async () => {

      await fetch('http://localhost:4000/api/customers/total_clients', {
      headers: {
        'x-token-auth':auth_token,
        }
    })

    .then(resp => resp.json())
    .then(clients_json => {

      const clients = clients_json.total_clients;
      const goalClients = 1200;
      const goalClientsPct = (clients/goalClients) * 100;
      setCountClients(clients);
      setCountClientsPct(
          {
          color: "warning",
          amount: "%" + goalClientsPct.toString(),
          label: "of " + goalClients.toString() + " goals",
        }
       );
        });
  

    await fetch('http://localhost:4000/api/sales/total', {
      headers: {
        'x-token-auth': auth_token,
      }
    })
    .then(resp => resp.json())
    .then(sales_json => {

      const totalSales = sales_json.total_sales;
      const goalSales = 10000;
      const goalSalesPct = (totalSales/goalSales) * 100;
      setTotalSales(totalSales);
      setTotalSalesPct(
        {
        color: "info",
        amount: "%" + goalSalesPct.toString(),
        label: "of " + goalSales.toString() + " goals",
      }
      );
      });
  

    await fetch('http://localhost:4000/api/sales/lastweek', {
      headers: {
        'x-token-auth': auth_token,
      }
    })    


    .then(resp => resp.json())
    .then(salesLastWeek_json => {

      const totalSalesLastWeek = salesLastWeek_json.lastweek_sales.length;
      const goalSales = 1000;
      const goalSalesPct = (totalSalesLastWeek/goalSales) * 100;
      setSalesLastWeek(totalSalesLastWeek);
      setExportCsv(salesLastWeek_json.lastweek_sales);
      setLastWeeklSalesPct(
              {
              color: "info",
              amount: "%" + goalSalesPct.toString(),
              label: "of " + goalSales.toString() + " goals",
              }
            );
            });
     

    await fetch('http://localhost:4000/api/sales/lastmonth', {
      headers: {
        'x-token-auth':auth_token,
      }
      }) 

    .then(resp => resp.json())
    .then(salesLastMonth_json => {


      let shipsDates = [];
      let salesMonthValues = [];
      const totalSalesLastMonth = salesLastMonth_json.lastmonth_sales.length;
      const goalSales = 1000;
      const goalSalesPct = (totalSalesLastMonth/goalSales) * 100;
      setSalesLastMonth(totalSalesLastMonth);
      setSalesLastMonthPct(
          {
            color: "info",
            amount: "%" + goalSalesPct.toString(),
            label: "of " + goalSales.toString() + " goals",
          }
        );
      salesLastMonth_json.lastmonth_sales.map(salestime => {
        shipsDates.push(salestime.Ship_Date);
        salesMonthValues.push(salestime.Sales);
      });  


      setLineChart({
        labels: shipsDates,
        datasets: [
            {
          label: "",
          color:"warning",
          data: salesMonthValues
            }
            ]
          }); 
          });
  


      await fetch('http://localhost:4000/api/sales/regions', {
      headers: {
        'x-token-auth':auth_token,
        } 
      }) 

      .then(resp => resp.json())
      .then(regions_json => {

      let regionsNames = [];
      let regionsValues = [];
        regions_json.region_sales.map(region => {
        regionsNames.push(region.Region);
        regionsValues.push(region.total_sales);

          });  

      setPieDataset({
          labels: regionsNames,
          datasets: {
          label: "",
          backgroundColors: ["info", "warning", "primary", "success"],
          data: regionsValues}
        });   
          });
    



    await fetch('http://localhost:4000/api/sales/states', {
      headers: {
        'x-token-auth':auth_token,
      } 
    })

    .then(resp => resp.json())
    .then(states_json => {


      let statesNames = [];
      let quantityValues = [];
      states_json.states_sales.map(state => {
        statesNames.push(state.State);
        quantityValues.push(state.quantity);
      });    


      setBarchart({
        labels: statesNames,
        datasets: {
        label: "",
        data: quantityValues}
        }); 
        });

  
      await fetch('http://localhost:4000/api/sales/segment', {
      headers: {
        'x-token-auth':auth_token,
        }
      })
  
        .then(resp => resp.json())
        .then(segment_json => {


        let segmentNames = [];
        let salesValues = [];
  
        segment_json.segment_sales.map(segment => {
        segmentNames.push(segment.Segment);
        salesValues.push(segment.total_sales);
        });
  
        setPolarChart({
          labels: segmentNames,
          datasets: {
          label: "",
          backgroundColors: ["info", "warning", "light", "success"],
          data: salesValues}});    
            });
  
  }
  ,
  []);

  useEffect(() => {
  getInfoBack();
  },[getInfoBack]);


    const { sales, tasks } = reportsLineChartData;
    const headers = [
  { label: "Customer_name", key: 'Customer_name' },
    { label: "Product_name", key: 'Product_name' },
    { label: "Date", key: 'Date' },
    { label: "Order_ID", key: 'Order_ID' },
    { label: "Priority", key: 'Priority' },
    { label: "Quantity", key: 'Quantity' },
    { label: "Sales", key: 'Sales' },
    { label: "Ship_Date", key: 'Ship_Date' },
    { label: "Ship_Mode", key: 'Ship_Mode' },
    { label: "Shipping_Cost", key: 'Shipping_Cost' },
    { label: "State", key: 'State' },
    { label: "Unit_Price", key: 'Unit_Price' },
    { label: "Zip_Code", key: 'Zip_Code' },
    { label: "Row_ID", key: 'Row_ID' },
        ]


    const csvReport = {
      filename: "Report.csv",
      headers:headers,
      data:exportCsv
      };

        return (
        <DashboardLayout>
          <DashboardNavbar />
          <MDButton
            variant="gradient"
            color="warning">
            <Icon sx={{ fontWeight: "bold" }}>
            add
            </Icon>
            &nbsp;
            <CSVLink {...csvReport}>
                Export 
            </CSVLink>
          </MDButton>
            <MDBox py={3}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={6} lg={3}>
                <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Total Sales"
                  count={totalSales}
                  percentage={totalSalesPct}
              />
                  </MDBox>
                </Grid>

    <Grid item xs={12} md={6} lg={3}>
      <MDBox mb={1.5}>
        <ComplexStatisticsCard
              icon="leaderboard"
              title="Total Clients"
              count={countClients}
              percentage={countClientsPct}
            />
        </MDBox>
    </Grid>

  <Grid item xs={12} md={6} lg={3}>
    <MDBox mb={1.5}>
      <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Sales last week"
              count={salesLastWeek}
              percentage={lastWeekSalesPct}
            />
        </MDBox>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
      <MDBox mb={1.5}>
        <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Sales last month"
                count={salesLastMonth}
                percentage={salesLastMonthPct}
            />
            </MDBox>
              </Grid>
              </Grid>
            <MDBox mt={4.5}>
              <Grid container spacing={3}>
              
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="info"
                      title="Sales by states"
                      description="Latest sales Performance"
                      date="campaign sent 2 days ago"
                      chart={Barchart}
                    />
                  </MDBox>
                </Grid> 
                  
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <DefaultLineChart
                    icon={{ color: "info", component: "leaderboard" }}
                    title="Line Sales Last Month"
                      description="Latest Sales Performance"
                    chart={lineChart}
                   />
                   </MDBox>
                  </Grid>
                </Grid>
                  </MDBox>

                    <MDBox mt={4.5}>
                      <Grid container spacing={3}>

                      <Grid item xs={12} md={6} lg={6}>
                    <MDBox mb={3}>
                    <PieChart
                      icon={{ color: "info", component: "leaderboard" }}
                      title="Sales by Regions"
                      description="Latest sales Performance"
                      chart={pieDataset}
                      />
                    </MDBox>
                  </Grid>

                      <Grid item xs={12} md={6} lg={6}>
                      <MDBox mb={3}>
                        <PolarChart
                          icon={{ color: "info", component: "leaderboard" }}
                          title="Sales by Segment"
                          description="Latest Sales Performance"
                          chart={polarChart}
                            />
                        </MDBox>
                        </Grid>

                        </Grid>
                        </MDBox>
                      </MDBox>
                        <Footer />
                    </DashboardLayout>
      );
}

export default Dashboard;
