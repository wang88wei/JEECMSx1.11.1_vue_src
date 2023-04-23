<script>
import OrgPermission from "./OrgPermission";
const columns = [
  {
    prop: "orgPerm",
    label: "组织",
    scopeType: "checkbox",
    minWidth: "200",
    formatter: (row, column, cellValue, index) => {
      return row.orgId ? row.orgName : "";
    },
    hidden: (row, column) => {
      if (row.orgId) {
        return false;
      } else {
        return true;
      }
    },
  },
  {
    prop: "rolePerm",
    label: "角色",
    minWidth: "120",
    scopeType: "checkbox",
    formatter: (row, column, cellValue, index) => {
      return row.orgId ? "" : row.roleName;
    },
    hidden: (row, column) => {
      if (row.orgId) {
        return true;
      } else {
        return false;
      }
    },
  },
];
export default {
  name: "GroupOrgPermission",
  extends: OrgPermission,
  data() {
    return {
      selectList: {
        api: "",
        columns,
        // height: 480,
        isTree: true,
        params: {
          [this.name]: this.value,
        },
      },
    };
  },
  watch: {
    value(newData, oldData) {
      if (newData && newData !== oldData) {
        this.selectList.params[this.name] = newData;
        this.$request.fetchOrganizeCount().then((res) => {
          if (res.code === 200) {
            this.selectList.api = "fetchSitesGroupPermOrg";
            if (res.data > 100) {
              this.selectList.lazy = true;
              this.selectList.params.getAll = false;
            } else {
              this.selectList.lazy = false;
              this.selectList.params.getAll = true;
            }
            this.fetchSelectTableApi();
          }
        });
      }
    },
  },
  methods: {
    // 请求数据并处理
    fetchTableCallBack(res) {
      if (res.code === 200) {
        const loop = function (data) {
          if (data instanceof Array && data.length) {
            return data.map((d) => {
              d.id = d.orgId ? "orgId_" + d.orgId : "roleId_" + d.roleId;
              d.orgPerm = d.siteOwner.hasPerm;
              d["orgPerm" + "Disabled"] = !d.siteOwner.canAssign;
              d.rolePerm = d.siteOwner.hasPerm;
              d["rolePerm" + "Disabled"] = !d.siteOwner.canAssign;
              if (d.children instanceof Array && d.children.length) {
                d.children = loop(d.children);
              }
              return d;
            });
          } else {
            return [];
          }
        };
        this.tableShow = false;
        this.selectList.data = loop(res.data);
        setTimeout(() => {
          this.tableShow = true;
        }, 100);
        this.initCheckStatus();
      }
    },
    // 保存按钮
    handleSave() {
      this.selectList.loading = true;
      let perms = [];
      const loop = function (data) {
        if (data instanceof Array && data.length) {
          data.forEach((d) => {
            perms.push({
              roleId: d.roleId,
              orgId: d.orgId,
              selected: d.orgId ? d.orgPerm : d.rolePerm,
            });
            if (d.children instanceof Array && d.children.length) {
              loop(d.children);
            }
          });
        }
      };
      loop(this.selectList.data);
      const data = {
        permOwner: "org",
        siteId: this.value,
        perms,
      };
      this.$request
        .fetchSitesGroupPermOrgUpdate(data)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "保存成功",
            });
          }
          this.hideSelectTableLoading();
        })
        .catch(() => {
          this.hideSelectTableLoading();
        });
    },
  },
};
</script>
