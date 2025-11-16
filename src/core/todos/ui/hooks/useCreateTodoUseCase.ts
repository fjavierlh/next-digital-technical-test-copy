import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTodoUseCase } from "../../application/command/create-todo.use-case";
import { TodosRestRepository } from "../../infrastructure/todos-rest-repository";

export const useCreateTodoUseCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      userId: string;
      title: string;
      completed: boolean;
    }) =>
      new CreateTodoUseCase(new TodosRestRepository()).execute(params.userId, {
        title: params.title,
        completed: params.completed,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todos", variables.userId] });
    },
  });
};
