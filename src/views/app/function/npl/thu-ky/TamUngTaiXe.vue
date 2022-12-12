<template>
  <div>
    <FormBasicNPL
      :title="'TẠM ỨNG TÀI XẾ'"
      :fields="fieldsTable"
      :items="dataTable"
      :optionByKey="options"
      :fieldsForm="fieldsForm"
    ></FormBasicNPL>
  </div>
</template>

<script>
import FormBasicNPL from "@/containers/npl/FormBasicNPL.vue";
export default {
  components: {
    FormBasicNPL,
  },
  data() {
    return {
      fieldsTable: [
        {
          key: "ID",
          label: "Mã CT",
        },
        {
          key: "createDate",
          label: "Ngày CT",
        },
        {
          key: "TaiXe",
          label: "Tài Xế",
        },
        {
          key: "SDT",
          label: "Số điện thoại",
          tdClass: "text-right",
        },
        {
          key: "SoTien",
          label: "Số tiền",
          tdClass: "text-right",
        },
        {
          key: "HinhThucChi",
          label: "Hình thức chi",
        },
        {
          key: "SoPhieuChi",
          label: "Số phiếu chi",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
        },
        {
          key: "statusName",
          label: "Trạng thái",
        },
      ],
      fieldsForm: [
        {
          key: "ID",
          label: "Mã CT",
          col: 2,
        },
        {
          key: "createDate",
          label: "Ngày CT",
          col: 2,
          type: "date",
        },
        {
          key: "SoPhieuChi",
          label: "Số phiếu chi",
          col: 2,
        },
        {
          col: 6,
          type: "hide",
        },
        {
          key: "TaiXe",
          label: "Tài Xế",
          col: 2,
          type: "select",
        },
        {
          key: "SDT",
          label: "Số điện thoại",
          tdClass: "text-right",
          col: 2,
        },
        {
          key: "SoTien",
          label: "Số tiền",
          col: 2,
          class: "text-right",
        },
        {
          key: "HinhThucChi",
          label: "Hình thức chi",
          col: 2,
          type: "select",
        },
        {
          key: "GhiChu",
          label: "Ghi chú",
          col: 8,
          type: "note",
        },
      ],
      dataTable: [
        {
          ID: "PC/22/001",
          createDate: "10:30 15/12/2022",
          TaiXe: "Nguyễn Văn A",
          SDT: "0961421396",
          SoTien: "10,000,000",
          HinhThucChi: "Chuyển khoản",
          SoPhieuChi: "SP12345",
          GhiChu: "...",
          statusName: "Chờ khóa",
          statusColor: "orange",
        },
        {
          ID: "PC/22/002",
          createDate: "11:30 15/12/2022",
          TaiXe: "Nguyễn Văn B",
          SDT: "0961421397",
          SoTien: "11,000,000",
          HinhThucChi: "Tiền mặt",
          SoPhieuChi: "SP12346",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
        },
        {
          ID: "PC/22/003",
          createDate: "12:30 15/12/2022",
          TaiXe: "Nguyễn Văn C",
          SDT: "0961421398",
          SoTien: "12,000,000",
          HinhThucChi: "Chuyển khoản",
          SoPhieuChi: "SP12347",
          GhiChu: "...",
          statusName: "Đã khóa",
          statusColor: "red",
        },
      ],
      options: {
        TaiXe: ["Nguyễn Văn A", "Nguyễn Văn B", "Nguyễn Văn C", "Nguyễn Văn D"],
        HinhThucChi: ["Chuyển Khoản", "Tiền mặt"],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>