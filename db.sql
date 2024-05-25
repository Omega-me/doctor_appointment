-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2024 at 10:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctor_appointment`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `info` text NOT NULL,
  `request` tinyint(1) NOT NULL,
  `customerinfo_id` int(11) NOT NULL,
  `doctorinfo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `date`, `info`, `request`, `customerinfo_id`, `doctorinfo_id`) VALUES
(8, '2024-06-01', 'Annual checkup', 1, 2, 2),
(27, '2024-06-15', 'Follow-up visit', 1, 8, 9),
(28, '2024-07-01', 'Consultation', 1, 6, 2),
(29, '2024-07-10', 'Routine check', 0, 6, 6),
(30, '2024-07-20', 'Skin allergy', 1, 1, 1),
(31, '2024-07-25', 'Heart issues', 0, 1, 2),
(32, '2024-08-01', 'Monthly checkup', 1, 10, 7);

-- --------------------------------------------------------

--
-- Table structure for table `customer_info`
--

CREATE TABLE `customer_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `dob` date NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `phone` varchar(13) NOT NULL,
  `info` text DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_info`
--

INSERT INTO `customer_info` (`id`, `first_name`, `last_name`, `dob`, `gender`, `phone`, `info`, `user_id`) VALUES
(1, 'Jane', 'Smith', '1985-06-15', 'Female', '555-1234', 'N/A', 3),
(2, 'John', 'Smith', '1990-09-23', 'Male', '555-5678', 'Allergic to penicillin', 5),
(5, 'Carol', 'Johnson', '1975-05-14', 'Female', '555-7890', 'Asthma', 8),
(6, 'David', 'Wilson', '1983-11-12', 'Male', '555-0987', 'N/A', 9),
(7, 'Eve', 'Taylor', '1995-07-22', 'Female', '555-4567', 'N/A', 10),
(8, 'Frank', 'Moore', '1979-09-08', 'Male', '555-4321', 'N/A', 11),
(9, 'Grace', 'Hall', '1982-12-25', 'Female', '555-3210', 'Allergic to nuts', 12),
(10, 'Henry', 'Allen', '1994-04-18', 'Male', '555-5670', 'N/A', 13);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_info`
--

CREATE TABLE `doctor_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `dob` date NOT NULL,
  `role` varchar(30) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `phone` varchar(13) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_info`
--

INSERT INTO `doctor_info` (`id`, `first_name`, `last_name`, `dob`, `role`, `gender`, `phone`, `user_id`) VALUES
(1, 'John', 'Doe', '1975-02-28', 'Cardiologist', 'Male', '555-8765', 2),
(2, 'Mary', 'Jane', '1980-11-12', 'Dermatologist', 'Female', '555-4321', 4),
(5, 'James', 'Taylor', '1982-09-15', 'General Practitioner', 'Male', '555-9087', 16),
(6, 'Emily', 'Clark', '1985-11-05', 'Neurologist', 'Female', '555-2109', 17),
(7, 'Michael', 'Lewis', '1978-12-25', 'Oncologist', 'Male', '555-3012', 18),
(8, 'Sophia', 'Walker', '1980-03-01', 'Gynecologist', 'Female', '555-2134', 19),
(9, 'William', 'Young', '1972-07-07', 'Urologist', 'Male', '555-8761', 20),
(10, 'Linda', 'Harris', '1968-05-20', 'Dermatologist', 'Female', '555-6542', 21);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('Admin','Doctor','Patient') NOT NULL DEFAULT 'Patient'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin@example.com', '$2b$08$qU3.t0.ppmE4GBvOb7n/jOREJmzpB8Wh4pTxnZLVId9SXwvanW1E6', 'Admin'),
(2, 'dr.john.doe@example.com', '$2b$08$synaCR/Pq3IbiOCB.su.ZeGo6fOfxJ8zbupyvHrD7xjeBL4Zz1vQ6', 'Doctor'),
(3, 'jane.smith@example.com', '$2b$08$rvc0.8wf8SKvPPwjLgL65utfzSwC5HAOdjQmfCYraVtqhRltomBEu', 'Patient'),
(4, 'dr.mary.jane@example.com', '$2b$08$5w./3Hyii/Jyj0bzm4IiFOhsdLWr59uynnRGe9KfDMwcJc0Sdjy26', 'Doctor'),
(5, 'john.smith@example.com', '$2b$08$MoYR2AFtcrz3lbqt/ufeu.Vr/9gOUPDoqZrNbJahqsbwdoQuRLv7u', 'Patient'),
(6, 'alice.brown@example.com', '$2b$08$u1xz1yV0ztG.5hdhl6Q0.eaHRufVhcF2ReMk3pmABxJZ1sQHSkaLi', 'Patient'),
(7, 'bob.davis@example.com', '$2b$08$SiIvI8F.5/FeYugvTqu62.PJjHeGFRZg7p3hYvnPC5M9Hl5gq5iE.', 'Patient'),
(8, 'carol.johnson@example.com', '$2b$08$uYJ7iw7pE.sNw9rSgGHXIuCIRPvI30JZMj5U0XpK7x5zRYT5AoHci', 'Patient'),
(9, 'david.wilson@example.com', '$2b$08$SI8GpH.LOpI5F5xPhcq6GuELzI6H.KmWW/pPi5kGcF0vX5LyYh8UW', 'Patient'),
(10, 'eve.taylor@example.com', '$2b$08$zJ0Pme2K.TChALUxu4HX7.1J/fKxnZ2j/ZHPozXbkW8YIjrbR6LQe', 'Patient'),
(11, 'frank.moore@example.com', '$2b$08$AlWIzSp.Q8G5.cY2Qs8OteZxfvNRsDi6Af5bNE8s.Q4ZyT/SvFxaS', 'Patient'),
(12, 'grace.hall@example.com', '$2b$08$LK5eW91/0AsdlPA63fJoVuQ5YaM6e6JGx3z4cTiX2Pb3/ow5otbuS', 'Patient'),
(13, 'henry.allen@example.com', '$2b$08$S1Zo1kBd9.cD2GkDoN5cyOA3xzZ6AqFzV7JHGyO9n5pKk6sT.E3vK', 'Patient'),
(14, 'dr.robert.smith@example.com', '$2b$08$SD2YQKnY0g7Rg6aF4fHiRe29Am2NaU7JLU7Z69NYwKH6J.ALPyNaW', 'Doctor'),
(15, 'dr.laura.wilson@example.com', '$2b$08$a.scl6J9uKLTbEhlD0JgKuBRjoTtM4s6t/bVw1c5fzHV3iKi2IReS', 'Doctor'),
(16, 'dr.james.taylor@example.com', '$2b$08$G7VHtC7fE3TUtHUXzjU7XuLTso/cA2UwZUNZZrrKppkRVppIHrrpK', 'Doctor'),
(17, 'dr.emily.clark@example.com', '$2b$08$xFRCeK8IMB9uKNNugE4F4uB7HrQ.vHtLbQz4i7R6pxMVeSNaGGaxW', 'Doctor'),
(18, 'dr.michael.lewis@example.com', '$2b$08$G8VIZ93dKnqD3H1p5O/8sugFvZV3JY2.8.vyP1o0jDK3cMoP3KRA6', 'Doctor'),
(19, 'dr.sophia.walker@example.com', '$2b$08$BHF5r7p4MLKztzRYti1hzeD5.cFC1B6JBYOIlXETeOXsy0udRoU3O', 'Doctor'),
(20, 'dr.william.young@example.com', '$2b$08$3iQsZL.FQDhRp8F7/L4N8OV8k5OcRzOtS1zFvX8vJ7KmHEnZupvlW', 'Doctor'),
(21, 'dr.linda.harris@example.com', '$2b$08$L3p3JWwaHVi.q2M5VxB3zu1WkZm3yAab/bO6ZZ8uW8YqGt6EM3Jty', 'Doctor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_customerinfo_id` (`customerinfo_id`),
  ADD KEY `appointment_doctorinfo_id` (`doctorinfo_id`);

--
-- Indexes for table `customer_info`
--
ALTER TABLE `customer_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_info_user_id` (`user_id`);

--
-- Indexes for table `doctor_info`
--
ALTER TABLE `doctor_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_info_user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `customer_info`
--
ALTER TABLE `customer_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `doctor_info`
--
ALTER TABLE `doctor_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_customerinfo_id` FOREIGN KEY (`customerinfo_id`) REFERENCES `customer_info` (`id`),
  ADD CONSTRAINT `appointment_doctorinfo_id` FOREIGN KEY (`doctorinfo_id`) REFERENCES `doctor_info` (`id`);

--
-- Constraints for table `customer_info`
--
ALTER TABLE `customer_info`
  ADD CONSTRAINT `customer_info_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `doctor_info`
--
ALTER TABLE `doctor_info`
  ADD CONSTRAINT `doctor_info_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
