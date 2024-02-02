import { useFormik } from "formik";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { useMonth } from "../../../app/shared/hooks/useMonth";
import { initialValues, validationSchema } from "./_validation";

interface Props {
  open: boolean;
  onClose(): void;
  onFilter({ month }: { month: string }): void;
}
export function FilterMonth({ open, onClose, onFilter }: Props) {
  const { month } = useMonth();
  const formik = useFormik({
    onSubmit: async (values) => {
      onFilter(values);

      onClose();
    },
    initialValues,
    validationSchema,
  });

  return (
    <Modal animate="CENTER" title={"Filtrar Mês"} open={open} onClose={onClose}>
      <form className="py-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            type="month"
            name="month"
            placeholder="Mês"
            defaultValue={month}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <Button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? <Loader /> : "Salvar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
