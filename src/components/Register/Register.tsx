import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import userFunction from "../../api/userFunction";
import { NavLink, useHistory } from "react-router-dom";
import { CustomTextField } from "../common/CustomTextField";
import { CustomSelect } from "../common/CustomSelect";
import Logo from "../../img/Logo/logo.png";
import { CustomButton } from "../common/CustomButton";
import orderApi from "../../api/orderApi";

const Register = () => {
  const [role, setRole] = React.useState<string>("");
  const navigated = useHistory();
  const [provinceId, setProvinceId] = React.useState<string>("");
  const [provinces, setProvinces] = React.useState<any>([]);
  const [districtId, setDistrictId] = React.useState<string>("");
  const [districts, setDistricts] = React.useState<any>([]);
  const [wardId, setWardId] = React.useState<string>("");
  const [wards, setWards] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchProvince = async () => {
      const response: any = await orderApi.getProvinces();
      setProvinces(response.data);
    };
    fetchProvince();
  }, []);

  const fetchDistrict = async (provinceId: string) => {
    setDistricts([]);
    const response: any = await orderApi.getDistricts(provinceId);
    setDistricts(response.data);
  };

  const fetchWard = async (districtId: string) => {
    setWards([]);
    const response: any = await orderApi.getWards(districtId);
    setWards(response.data);
  };

  const handleProvinceChange = (provinceId: string) => {
    setProvinceId(provinceId);
    fetchDistrict(provinceId);
  };

  const handleDistrictChange = (districtId: string) => {
    setDistrictId(districtId);
    fetchWard(districtId);
  };

  let logoStyle = {
    width: "50px",
    transition: "400ms ease",
    borderRadius: "50%",
    padding: "5px",
  };

  let navlinkLogoStyle = {
    display: "flex",
    alignItems: "center",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get("username"),
      password: data.get("password"),
      profile: {
        name: data.get("name"),
        email: data.get("email"),
        certificate: data.get("certificate"),
        district_code: data.get("Qu???n"),
        district: districts.find(
          (district: any) => district.districtId === districtId
        ).name,
        province_code: data.get("Th??nh ph???"),
        province: provinces.find(
          (province: any) => province.provinceId === provinceId
        ).name,
        ward_code: data.get("Ph?????ng"),
        ward: wards.find((ward: any) => ward.wardId === wardId).name,
        address: data.get("address"),
      },
    };
    try {
      const response: any = await userFunction.register(body, role);
      if (response.status === 200) {
        navigated.push("/sign-in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <NavLink to="/" style={navlinkLogoStyle}>
            <img src={Logo} alt="logo" style={logoStyle} />
          </NavLink>
          <Typography component="h1" variant="h5">
            Tham gia v???i chung t??i
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <CustomTextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="T??n ????ng nh???p"
              type="text"
              id="username"
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="M???t kh???u"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="T??n ng?????i d??ng"
              type="text"
              id="name"
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              name="certificate"
              label="C??n c?????c c??ng d??n"
              type="text"
              id="cerfiticate"
            />
            <CustomSelect
              label="Vai tr??"
              options={[
                { value: "shop", label: "C???a h??ng" },
                { value: "customer", label: "Ng?????i d??ng" },
              ]}
              value={role}
              setValue={setRole}
            />
            <CustomSelect
              label="Th??nh ph???"
              options={provinces?.map((item: any) => ({
                value: item.provinceId,
                label: item.name,
              }))}
              value={provinceId}
              setValue={handleProvinceChange}
            />
            <CustomSelect
              label="Qu???n"
              options={districts?.map((item: any) => ({
                value: item.districtId,
                label: item.name,
              }))}
              value={districtId}
              setValue={handleDistrictChange}
            />
            <CustomSelect
              label="Ph?????ng"
              options={
                wards === null
                  ? []
                  : wards.map((item: any) => ({
                      value: item.wardId,
                      label: item.name,
                    }))
              }
              value={wardId}
              setValue={setWardId}
            />
            <CustomTextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="??ia ch???"
              name="address"
              autoComplete="address"
              autoFocus
            />
            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ????ng k??
            </CustomButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Register;

const theme = createTheme();
