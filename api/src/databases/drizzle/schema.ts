import * as AuthenticationSchema from "@/models/drizzle/authentication.model";
import * as TasksSchema from "@/models/drizzle/task.model";
import * as UserSchema from "@/models/drizzle/user.model";

const schema = {
	...AuthenticationSchema,
	...TasksSchema,
	...UserSchema,
};

export default schema;
