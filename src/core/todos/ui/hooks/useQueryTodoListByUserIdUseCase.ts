import { useQuery } from "@tanstack/react-query";
import { QueryTodoListByUserIdUseCase } from "../../application/query/query-todo-list-by-user-id.use-case";
import { TodosRestRepository } from "../../infrastructure/todos-rest-repository";

export const useQueryTodoListByUserIdUseCase = (userId: string) => {
  return useQuery({
    queryKey: ["todos", userId],
    queryFn: async () =>
      new QueryTodoListByUserIdUseCase(new TodosRestRepository()).execute(
        userId
      ),
  });
};
