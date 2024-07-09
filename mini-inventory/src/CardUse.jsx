import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, Paper, styled } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
// import { red } from "@mui/material/colors";

const CartIcon = styled(ShoppingCartOutlinedIcon)(({}) => ({
  fontSize: 50,
  fontWeight: 1000,
  margin: 0,
  backgroundColor: "inherit",
}));

const MoneyIcon = styled(MonetizationOnOutlinedIcon)(({}) => ({
  fontSize: 50,
  fontWeight: 1000,
  margin: 0,
  backgroundColor: "inherit",
}));

const OutOfStockIcon = styled(ProductionQuantityLimitsOutlinedIcon)(({}) => ({
  fontSize: 50,
  fontWeight: 1000,
  margin: 0,
  backgroundColor: "inherit",
}));

const CategoriesIcon = styled(WidgetsOutlinedIcon)(({}) => ({
  fontSize: 50,
  fontWeight: 1000,
  margin: 0,
  backgroundColor: "inherit",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "right",
  backgroundColor: "inherit",
  color: "#fff",
  cursor: "pointer",
  fontSize: 30,
  boxShadow: "none",
  margin: 0,
  pl: 0,
}));

const cardContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  padding: "10px",
};

const cardStyles = [
  {
    backgroundColor: "#b624ff",
    color: "#fff",
  },
  {
    backgroundColor: "#32963d",
    color: "#fff",
  },
  {
    backgroundColor: "#c41849",
    color: "#fff",
  },
  {
    backgroundColor: "#03a5fc",
    color: "#fff",
  },
];

export default function CardUse({ data }) {
  return (
    <div style={cardContainerStyle}>
      {cardStyles.map((style, index) => (
        <Card key={index} style={{ ...style, minWidth: '275px', borderRadius: '10px', cursor: 'pointer', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={2}>
                {index === 0 && <CartIcon />}
                {index === 1 && <MoneyIcon />}
                {index === 2 && <OutOfStockIcon />}
                {index === 3 && <CategoriesIcon />}
              </Grid>
              <Grid item xs={10}>
                <Item>
                  {index === 0 && "Total Products"}
                  {index === 1 && "Total Store Value"}
                  {index === 2 && "Out of Stock"}
                  {index === 3 && "All Categories"}
                </Item>
                <Item>8</Item> {/* Example data usage */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}