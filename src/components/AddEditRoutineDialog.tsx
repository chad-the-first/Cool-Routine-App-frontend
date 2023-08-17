import { Button, Form, Modal } from "react-bootstrap";
import { Routine } from "../models/routine";
import { useForm } from "react-hook-form";
import { RoutineInput } from "../network/routine_api";
import * as RoutineApi from "../network/routine_api";
import TextInputField from "./form/TextInputField";

interface props {
  routineToEdit?: Routine;
  onDismiss: () => void;
  onRoutineSaved: (routine: Routine) => void;
  value: string;
}

const AddEditRoutineDialog = ({
  value,
  routineToEdit,
  onDismiss,
  onRoutineSaved,
}: props) => {
  const day = value.slice(0, 10);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoutineInput>({
    defaultValues: {
      fun: routineToEdit?.fun || "0",
      knowledge: routineToEdit?.knowledge || "0",
      work: routineToEdit?.work || "0",
      service: routineToEdit?.service || "0",
      self_care: routineToEdit?.self_care || "0",
      family: routineToEdit?.family || "0",
      date: routineToEdit?.date || day,
    },
  });

  async function onSubmit(input: RoutineInput) {
    try {
      let routineResponse: Routine;
      if (routineToEdit) {
        routineResponse = await RoutineApi.updateRoutine(
          routineToEdit._id,
          input
        );
      } else {
        routineResponse = await RoutineApi.createRoutine(input);
      }
      onRoutineSaved(routineResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {routineToEdit ? "Edit summary for " + day : "Add summary for " + day}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditRoutineForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="fun"
            label="Fun"
            type="range"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.fun}
          />
          <TextInputField
            name="knowledge"
            label="Knowledge"
            type="range"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.knowledge}
          />
          <TextInputField
            name="work"
            label="Work"
            type="range"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.work}
          />
          <TextInputField
            name="service"
            label="Service"
            type="range"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.service}
          />
          <TextInputField
            name="self_care"
            label="Self_care"
            type="range"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.self_care}
          />
          <TextInputField
            name="family"
            label="Family"
            type="range"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.family}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addEditRoutineForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditRoutineDialog;
