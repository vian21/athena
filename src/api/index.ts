import users from "@api/users";
// import marks from "@api/marks";

// import { logger } from "@api/plugins/logger";
import { FastifyInstance } from "fastify";
import discipline from "./discipline";
import schools from "./schools";
import subjectEnrollments from "./subject-enrollments";
import gradingScale from "./grading_scale";
import marks from "./marks";
import assessments from "./assessments";
import subjects from "./subjects";
import accounting from "./accounting";
import schoolTransactions from "./school_transactions";
import Grades from "./grades";
import academicEnrollments from "./academic_enrollment";
import academicPeriods from "./academic_period";

export default function api(server: FastifyInstance, opts: any, done: any) {
    server.get("/", async () => {
        return "Welcome to the api";
    });

    /**
     * Routes
     */
    server.register(users, { prefix: "/users" });
    server.register(schools, { prefix: "/schools" });
    server.register(discipline, { prefix: "/discipline" });
    server.register(subjectEnrollments, { prefix: "/subject_enrollments" });
    server.register(gradingScale, { prefix: "/grading_scale" });
    server.register(marks, { prefix: "/marks" });
    server.register(assessments, { prefix: "/assessments" });
    server.register(subjects, { prefix: "/subjects" });
    server.register(academicPeriods, { prefix: "/academic_period" });
    server.register(accounting, { prefix: "/accounting" });
    server.register(schoolTransactions, { prefix: "/school_transactions" });
    server.register(Grades, { prefix: "/grades" });
    server.register(academicEnrollments, { prefix: "/academic_enrollments" });
    server.register(academicPeriods, { prefix: "/academic_periods" });

    done();
}
