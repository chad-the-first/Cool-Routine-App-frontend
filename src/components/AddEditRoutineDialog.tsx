import { Button, Form, Modal } from "react-bootstrap";
import { Routine } from "../models/routine";
import { useForm } from "react-hook-form";
import { RoutineInput } from "../network/routine_api";
import * as RoutineApi from "../network/routine_api";

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
        routineResponse = await RoutineApi.creatRoutine(input);
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
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register("text")}
            />
          </Form.Group>
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
