import * as React from "react";
import Alert from "../Alert";
import KRInput from "../KRInput";

export type DeliveryAddressForm = {
  province: "";
  regency: "";
  district: "";
  village: "";
};

type Props = {
  form: DeliveryAddressForm;
  setForm: React.Dispatch<React.SetStateAction<DeliveryAddressForm>>;
};

export default function DeliveryAddress(props: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setForm({ ...props.form, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Alert
        message="Pastikan semua alamat pengiriman sudah benar"
        type="Warning"
      />
      <div className="mt-2 space-y-3">
        <KRInput
          autoComplete="off"
          required
          placeholder="Masukan provinsi tujuan pengiriman"
          label="Provinsi"
          name="province"
          value={props.form.province}
          onChange={handleChange}
        />
        <KRInput
          autoComplete="off"
          required
          placeholder="Masukan kota/kabupaten tujuan pengiriman"
          label="Kota / Kabupaten"
          name="regency"
          value={props.form.regency}
          onChange={handleChange}
        />
        <KRInput
          autoComplete="off"
          required
          placeholder="Masukan kecamatan tujuan pengiriman"
          label="Kecamatan"
          name="district"
          value={props.form.district}
          onChange={handleChange}
        />
        <KRInput
          autoComplete="off"
          required
          placeholder="Masukan desa/kelurahan tujuan pengiriman"
          label="Desa / Kelurahan"
          name="village"
          value={props.form.village}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
