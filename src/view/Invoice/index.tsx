import * as React from "react";
import styled from "styled-components";
import {
  CardMedia,
  Container,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { AppContext } from "../../context/Context";
import orderApi from "../../api/orderApi";
import { CustomButton } from "../../components/common/CustomButton";
import Value from "../../components/Value";
import { CustomSelect } from "../../components/common/CustomSelect";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    background: "rgba(255, 255, 255, 0.8)",
    border: " 1px solid rgb(219 125 13) !important",
    borderRadius: "10px",
    padding: "20px",
  },
  table: {
    "& tr": {
      minHeight: "100px !important",
      height: "100px !important",
    },

    cursor: "pointer",
  },
  THead: {
    "& th": {
      borderBottom: "none !important",
      fontWeight: "bold",
      fontSize: "20px",
    },

    borderBottom: "1px solid #7e7979",
  },
  TBody: {
    "& :hover ": {
      background: "#F7A75D",
    },
    "& tr th": {
      borderBottom: "none !important",
      textAlign: "left !important",
      fontSize: "18px",
    },
    "& tr td": {
      borderBottom: "none !important",
      fontSize: "18px",
    },
  },
  tableHead: {
    "&>:nth-child(1)": {
      color: "#000 !important",

      width: "100px ",
    },
    "&>:nth-child(2)": {
      color: "#000 !important",

      width: "150px",
    },
    "&>:nth-child(3)": {
      color: "#000 !important",

      width: "200px",
    },
    "&>:nth-child(4)": {
      color: "#000 !important",

      width: "20px",
    },
    "&>:nth-child(5)": {
      color: "#000 !important",

      width: "200px",
    },
  },
  tableBody: {
    "&>:nth-child(1)": {
      color: "#000 !important",

      width: "100px !important",
      textAlign: "left !important",
    },
    "&>:nth-child(2)": {
      color: "#000 !important",

      width: "150px",
    },
    "&>:nth-child(3)": {
      color: "#000 !important",

      width: "200px",
    },
    "&>:nth-child(4)": {
      color: "#000 !important",

      width: "200px",
    },
    "&>:nth-child(5)": {
      color: "#000 !important",

      width: "200px",
    },
  },
  gridItem: {
    height: "100%",
    borderRadius: "12px",
    [theme.breakpoints.up("md")]: {
      height: "90px",
    },
  },
  TokenSymbol: {
    padding: "0px !important",
  },
  tablerContainer: {
    borderBottom: "1px solid !important",
  },
  gridWrapper: {
    paddingTop: "40px",
  },
}));
export default function Invoice() {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch, invoice, setInvoice, auth, setAuth } =
    React.useContext(AppContext);
  const [feeShip, setFeeShip] = React.useState<any>();
  const [voucher, setVoucher] = React.useState<any>();
  const [service, setService] = React.useState<any>();
  const [voucherId, setVoucherId] = React.useState<any>();
  const [serviceId, setServiceId] = React.useState<any>();
  const [totalPrice, setTotalPrice] = React.useState<any>(
    invoice
      .map((item: any) => item.quantity * item.price)
      .reduce((acc: any, value: any) => acc + value)
      .toFixed(2)
  );
  // React.useEffect(() => {
  //   async function fetchData() {
  //     const voucher = await orderApi.getVoucher();
  //     const objectShip = {
  //       from_district: Number(auth.profile.district_code),
  //       to_district: 1526,
  //     };
  //     const service = await orderApi.getService(objectShip);
  //     setService(service.data);
  //     setVoucher(voucher.data);
  //   }
  //   fetchData();
  // }, [auth.profile.district_code]);

  const handleChangeVoucher = (e: any) => {
    // let temp = Number(totalPrice);
    // if (e.target.value > 1) {
    //   temp = temp - Number(e.target.value);
    // } else {
    //   temp = temp * (1 - Number(e.target.value));
    // }
    // setTotalPrice(temp);
    setVoucherId(e.target.value);
  };
  const getFeeShip = (e: any) => {
    const objectCall = {
      from_district_id: 1531,
      service_id: e.target.value,
      to_district_id: auth.profile.district_code,
      to_ward_code: auth.profile.ward_code,
      toPhone: auth.profile.phone_number,
      items: invoice.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };
    orderApi.getFeeShip(objectCall).then((rs) => {
      setTotalPrice(Number(totalPrice) + Number(rs.data.total));
      setFeeShip(Number(rs.data.total));
      setServiceId(e.target.value);
    });
  };
  const orderProduct = async () => {
    const objectCall = {
      // shopId: "8dcc9380-95ed-4ec2-a43f-9e3eeae7d697",
      shopId: invoice?.at(0)?.shopId,
      address: `${auth.profile.address},${auth.profile.district},${auth.profile.ward},${auth.profile.province}`,
      toName: auth.profile.name,
      toPhone: auth.profile.phone_number,
      toStreet: auth.profile.address,
      toWardCode: auth.profile.ward_code,
      toDistrictId: auth.profile.district_code,
      serviceId: serviceId,
      voucherId: voucherId,
      items: invoice.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };
  };

  return (
    <WrapAll style={{ padding: 20 }}>
      <WrapContainer maxWidth="md">
        {/* <CustomButton onClick={() => history.goBack()}>Quay lại</CustomButton> */}

        <Paper className={classes.tableContainer}>
          {/* <div>
            <Value
              value={`Tên: ${auth.profile.name} `}
              size="20px"
              color="#FFA500"
            />
          </div>
          <div>
            <Value
              value={`Địa chỉ: ${auth.profile.name} `}
              size="20px"
              color="#FFA500"
            />
          </div>
          <div>
            <Value
              value={`Email: : ${auth.profile.email} `}
              size="20px"
              color="#FFA500"
            />
          </div>
          <div>
            <Value
              value={`SDT: ${auth.profile.phone_number} `}
              size="20px"
              color="#FFA500"
            />{" "}
          </div> */}
          <WrapTitle>
            <Value value={`Đơn hàng của bạn `} size="50px" color="#FFA500" />
          </WrapTitle>

          <TableContainer className={classes.tablerContainer}>
            <Table>
              <TableHead className={classes.THead}>
                <TableRow>
                  <TableCell>Ảnh sản phẩm</TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="right">Giá tiền</TableCell>
                </TableRow>
              </TableHead>

              <TableBody className={classes.TBody}>
                {invoice?.map((item: any) => {
                  console.log(
                    `${process.env.REACT_APP_API_BASE_URl_IMAGE}/${item.image[0]}`
                  );
                  return (
                    <TableRow key={item.name}>
                      <TableCell>
                        <CardMedia
                          image={`${process.env.REACT_APP_API_BASE_URl_IMAGE}/${item.image[0]}`}
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.quantity} </TableCell>
                      <TableCell align="right"> {item.price} </TableCell>
                      <TableCell align="right">
                        {item.quantity * item.price}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <WrapActionBill>
            <Grid container spacing={4}>
              <Grid item md={12}>
                <WrapVoucher>
                  <Value value={`Phương thức vận chuyển `} size="24px"  />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange={getFeeShip}
                  >
                    {service?.map((item: any) => (
                      <MenuItem value={item?.service_id}>
                        {item.short_name}
                      </MenuItem>
                    ))}
                  </Select>
                </WrapVoucher>
              </Grid>
              <Grid item md={12}>
                <WrapVoucher>
                  <Value value={`Bee Voucher `} size="24px" />

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange={handleChangeVoucher}
                  >
                    {voucher?.map((item: any) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </WrapVoucher>
              </Grid>
              <Grid item md={6} xs={12}>
                <WrapInformation>
                  <Value value={`Tên: `} size="16px" />
                </WrapInformation>
                <WrapInformation>
                  <Value value={`Địa chỉ:  `} size="16px" />
                </WrapInformation>
                <WrapInformation>
                  <Value value={`Email: : `} size="16px" />
                </WrapInformation>
                <WrapInformation>
                  <Value value={`SĐT: `} size="16px" />{" "}
                </WrapInformation>
              </Grid>

              <Grid item md={6}>
                <WrapPrice>
                  <Value value={`Tổng tiền: `} size="16px" />
                  <Value value={`${totalPrice} VNĐ`} size="16px" />
                </WrapPrice>
                <WrapPrice>
                  <Value value={`Giảm giá: `} size="16px" />
                  <Value value={`- ${totalPrice} VNĐ`} size="16px" />
                </WrapPrice>
                <WrapPrice>
                  <Value value={`Cần thanh toán: `} size="16px" />
                  <Value value={`${totalPrice} VNĐ`} size="16px" color="red" />
                </WrapPrice>
              </Grid>
            </Grid>
          </WrapActionBill>
          <WrapCenter>
            <CustomButton onClick={orderProduct}>
              HOÀN TẤT ĐẶT HÀNG
            </CustomButton>
          </WrapCenter>
        </Paper>
      </WrapContainer>
    </WrapAll>
  );
}
const WrapAll = styled.div``;

const WrapPrice = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  margin: 10px 0px;
  border-bottom: 1px solid;
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const WrapCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const WrapContainer = styled(Container)`
  margin-top: 100px;
  height: 100%;
`;

const WrapTitle = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  margin-bottom: 30px;
  padding: 10px;
`;

const WrapSelect = styled.div`
  margin-top: 20px;
  display: flex;
  align-item: center;
  width: 100%;
  gap: 20px;
`;

const WrapVoucher = styled.div`
  margin-top: 20px;
  display: flex;
  align-item: center;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
`;

const WrapActionBill = styled.div`
  margin-top: 30px;
  padding: 15px;
`;

const WrapInformation = styled.div`
  margin: 10px 0px 10px 0px;
  border-bottom: 1px solid;
  padding: 10px;
`;
