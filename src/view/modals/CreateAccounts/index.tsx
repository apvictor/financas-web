import { useEffect } from "react";
import { useFormik } from "formik";
import { Modal } from "../../components/Modal";
import { api } from "../../../app/services/api";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { Loader } from "../../components/Loader";
import { initialValues, validationSchema } from "./_validation";
import { AccountModel } from "../../../app/models/AccountModel";

interface Props {
  account: AccountModel | null;
  open: boolean;
  onClose(): void;
}
export function CreateAccounts({ account, open, onClose }: Props) {
  async function createAccount(name: string) {
    await api.post("accounts", { name });
  }

  async function editAccount(id: number, name: string) {
    await api.put(`accounts/${id}`, { name });
  }

  function deleteAccount(id: number) {
    api.delete(`accounts/${id}`).then(() => {
      onClose();
    });
  }

  const formik = useFormik({
    onSubmit: async ({ name }) => {
      account ? await editAccount(account.id, name) : await createAccount(name);
      onClose();
    },
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    if (account) {
      formik.setValues({
        name: account.name,
      });
    } else {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Modal
      animate="BOTTOM"
      title={account ? "Editar Conta" : "Criar Conta"}
      open={open}
      onClose={onClose}
      onDelete={() => deleteAccount(account ? account.id : 0)}
    >
      <form className="mt-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-6">
          <Select
            placeholder="Selecione um banco"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            messageError={formik.touched.name && formik.errors.name}
          >
            <option value="" disabled hidden></option>
            <option value="C6 Bank">C6 Bank</option>
            <option value="Bradesco">Bradesco</option>
            <option value="Caixa">Caixa</option>
            <option value="Inter">Inter</option>
            <option value="Itau">Itau</option>
            <option value="Next">Next</option>
            <option value="Pan">Pan</option>
            <option value="Nubank">Nubank</option>
            <option value="NuInvest">NuInvest</option>
            <option value="Santander">Santander</option>
            <option value="Will">Will</option>
          </Select>

          <Button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? <Loader /> : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
