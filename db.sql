-- Supprimer la base de données si elle existe
DROP DATABASE IF EXISTS app;

-- Créer la base de données
CREATE DATABASE app 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Utiliser la base de données pour le reste des opérations
USE app;

-- creer la table schools
DROP TABLE IF EXISTS schools;
CREATE TABLE schools(
    school_id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    motto VARCHAR(255),
    type INT, -- elementary and secondary
    email VARCHAR(255),
    logo VARCHAR(255),
    website VARCHAR(255),
    country VARCHAR(60),
    address VARCHAR(255),
    CONSTRAINT PRIMARY KEY (school_id)
);

-- creer la table grading_scale
DROP TABLE IF EXISTS grading_scale;
CREATE TABLE grading_scale(
    id_grading_scale INT AUTO_INCREMENT,
    school_id INT NOT NULL, -- fk
    max INT NOT NULL,
    min INT NOT NULL,
    grade VARCHAR(2),
    gpa FLOAT,
    CONSTRAINT PRIMARY KEY (id_grading_scale)
);


-- creer la table users
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    user_id INT AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    DOB DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    gender INT DEFAULT 0,
    email VARCHAR(255),
    tel VARCHAR(15), -- prof, staff and optionnal for student
    address VARCHAR(255),
    nationality VARCHAR(60),
    password TEXT,
    account_type INT NOT NULL,
    status BOOLEAN DEFAULT 0,
    CONSTRAINT PRIMARY KEY (user_id)
);



-- creer la table subject
DROP TABLE IF EXISTS subject;
CREATE TABLE subjects(
    subject_id INT AUTO_INCREMENT,
    school_id INT NOT NULL, -- FK
    user_id INT, -- teacher (users with a specifik type_user) FK
    start DATE,
    end DATE,
    archived BOOLEAN,
    language VARCHAR(255),
    subject_code VARCHAR(5),
    course_number VARCHAR(5), 
    name VARCHAR(255),
    description TEXT,
    CONSTRAINT PRIMARY KEY (subject_id)
);

-- creer la table subject_enrollment
DROP TABLE IF EXISTS subject_enrollment;
CREATE TABLE subject_enrollment(
    subject_enrollment_id INT AUTO_INCREMENT,
    subject_id INT NOT NULL, -- FK
    user_id INT NOT NULL, -- student FK
    academic_period_id INT NOT NULL, -- FK
    finished INT,
    CONSTRAINT PRIMARY KEY (subject_enrollment_id)
);

-- creer la table school_transactions
DROP TABLE IF EXISTS school_transactions;
CREATE TABLE school_transactions(
    school_transaction_id INT AUTO_INCREMENT,
    school_id INT NOT NULL, -- FK
    date Date NOT NULL,
    period INT,
    end_date DATE NOT NULL,
    CONSTRAINT PRIMARY KEY (school_transaction_id)
);

-- creer la table accounting
DROP TABLE IF EXISTS accounting;
CREATE TABLE accounting(
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL, -- FK
    amount FLOAT,
    date DATE,
    item VARCHAR(255),
    academic_period_id INT, -- FK avant
    CONSTRAINT PRIMARY KEY (id)
);


-- creer la table academic_periods
DROP TABLE IF EXISTS academic_periods;
CREATE TABLE academic_periods(
    academic_period_id INT AUTO_INCREMENT,
    star_date DATE,
    end_date DATE,
    type INT,
    CONSTRAINT PRIMARY KEY (academic_period_id)
);


-- creer la table academic_enrollment
DROP TABLE IF EXISTS academic_enrollment;
CREATE TABLE academic_enrollment(
    id INT AUTO_INCREMENT,
    user_id INT, -- FK
    academic_period_id INT, -- FK
    grade INT,
    CONSTRAINT PRIMARY KEY (id)
);

-- creer la table marks
DROP TABLE IF EXISTS marks;
CREATE TABLE marks(
    id INT AUTO_INCREMENT,
    subject_id INT, -- FK
    user_id INT, -- FK student
    mark FLOAT NOT NULL,
    academic_period_id INT, -- FK
    assessment_id INT, -- FK
    CONSTRAINT PRIMARY KEY (id)
);


-- creer la table assessments
DROP TABLE IF EXISTS assessments;
CREATE TABLE assessments(
    assessment_id INT AUTO_INCREMENT,
    subject_id INT, -- FK
    type INT NOT NULL,
    CONSTRAINT PRIMARY KEY (assessment_id)
);


-- creer la table discipline
DROP TABLE IF EXISTS discipline;
CREATE TABLE discipline(
    id INT AUTO_INCREMENT,
    user_id INT, -- FK student
    academic_period_id INT, -- FK
    points INT,
    infraction TEXT,
    invigilator INT, -- FK user
    CONSTRAINT PRIMARY KEY (id)
);


-- creer la table grade
DROP TABLE IF EXISTS grade;
CREATE TABLE grade(
    id INT AUTO_INCREMENT,
    school_id INT, -- FK 
    academic_period_id VARCHAR(20),
    CONSTRAINT PRIMARY KEY (id)
);


-- fK
ALTER TABLE grading_scale
    ADD CONSTRAINT fk_grading_scale_schools
    FOREIGN KEY(school_id)
    REFERENCES schools(school_id);
    
ALTER TABLE subjects
    ADD CONSTRAINT fk_subject_schools
    FOREIGN KEY(school_id)
    REFERENCES schools(school_id);
    
ALTER TABLE subjects
    ADD CONSTRAINT fk_subject_users
    FOREIGN KEY(user_id)
    REFERENCES users(user_id);
    
ALTER TABLE subject_enrollment
    ADD CONSTRAINT fk_subject_enrollment_subject
    FOREIGN KEY(subject_id)
    REFERENCES subjects(subject_id);
    
    
ALTER TABLE subject_enrollment
    ADD CONSTRAINT fk_subject_enrollment_users
    FOREIGN KEY(user_id)
    REFERENCES users(user_id);


ALTER TABLE subject_enrollment
    ADD CONSTRAINT fk_subject_enrollment_academic_periods
    FOREIGN KEY(academic_period_id)
    REFERENCES academic_periods(academic_period_id);
    
ALTER TABLE school_transactions
    ADD CONSTRAINT fk_school_transactions_schools
    FOREIGN KEY(school_id)
    REFERENCES schools(school_id);
    
ALTER TABLE accounting
    ADD CONSTRAINT fk_accounting_users
    FOREIGN KEY(user_id)
    REFERENCES users(user_id);
    
ALTER TABLE accounting
    ADD CONSTRAINT fk_accounting_academic_periods
    FOREIGN KEY(academic_period_id)
    REFERENCES academic_periods(academic_period_id);
    
ALTER TABLE academic_enrollment
    ADD CONSTRAINT fk_academic_enrollment_users
    FOREIGN KEY(user_id)
    REFERENCES users(user_id);

ALTER TABLE academic_enrollment
    ADD CONSTRAINT fk_academic_enrollment_academic_periods
    FOREIGN KEY(academic_period_id)
    REFERENCES academic_periods(academic_period_id);


ALTER TABLE marks
    ADD CONSTRAINT fk_marks_subject
    FOREIGN KEY(subject_id)
    REFERENCES subjects(subject_id);
    
ALTER TABLE marks
    ADD CONSTRAINT fk_marks_users
    FOREIGN KEY(user_id)
    REFERENCES users(user_id);
    
ALTER TABLE marks
    ADD CONSTRAINT fk_marks_academic_periods
    FOREIGN KEY(academic_period_id)
    REFERENCES academic_periods(academic_period_id);
    
ALTER TABLE assessments
    ADD CONSTRAINT fk_assessments_subject
    FOREIGN KEY(subject_id)
    REFERENCES subjects(subject_id);
    
ALTER TABLE discipline
    ADD CONSTRAINT fk_discipline_users
    FOREIGN KEY(user_id)
    REFERENCES users(user_id);

ALTER TABLE discipline
    ADD CONSTRAINT fk_discipline_academic_periods
    FOREIGN KEY(academic_period_id)
    REFERENCES academic_periods(academic_period_id);
    
 ALTER TABLE discipline
    ADD CONSTRAINT fk_discipline_invigilator
    FOREIGN KEY(invigilator)
    REFERENCES users(user_id);


ALTER TABLE grade
    ADD CONSTRAINT fk_grade_schools
    FOREIGN KEY(school_id)
    REFERENCES schools(school_id);