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
}

const AddEditRoutineDialog = ({
  routineToEdit,
  onDismiss,
  onRoutineSaved,
}: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoutineInput>({
    defaultValues: {
      title: routineToEdit?.title || "",
      text: routineToEdit?.text || "",
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
          {routineToEdit ? "Edit routine" : "Add routine"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditRoutineForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
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
