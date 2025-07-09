# Host: localhost  (Version 8.0.30)
# Date: 2025-07-09 15:54:34
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "blogs"
#

DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `title` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text,
  `content` text NOT NULL,
  `featured_image` text,
  `category` text NOT NULL,
  `tags` json DEFAULT NULL,
  `published` tinyint(1) NOT NULL,
  `featured` tinyint(1) NOT NULL,
  `publish_date` datetime DEFAULT NULL,
  `created_by` char(36) DEFAULT NULL,
  `updated_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`),
  CONSTRAINT `blogs_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "blogs"
#

INSERT INTO `blogs` VALUES ('Mobile ERP: Business on the Go','mobile-erp-business-on-go','Discover how mobile ERP solutions enable productivity and decision-making anywhere.','# Mobile ERP: Business on the Go\n\nMobile ERP solutions are transforming how businesses operate, enabling real-time access to critical information from anywhere.\n\n## Mobile Capabilities\n\n### Real-time Data Access\nAccess dashboards, reports, and key metrics on mobile devices.\n\n### Workflow Approvals\nApprove purchase orders, expense reports, and other documents remotely.\n\n### Field Operations\nUpdate inventory, record transactions, and manage projects from the field.\n\n### Customer Interactions\nAccess customer information during meetings and site visits.\n\n## Benefits\n\n### Increased Productivity\nEmployees can work efficiently regardless of location.\n\n### Faster Decision Making\nReal-time data enables quick, informed decisions.\n\n### Improved Customer Service\nInstant access to customer data improves service quality.\n\n### Cost Reduction\nReduce travel and office overhead costs.\n\n## Implementation Considerations\n\n1. Security protocols for mobile access\n2. User interface optimization for mobile devices\n3. Offline capability requirements\n4. Device management policies',NULL,'Technology',X'5B226D6F62696C65222C202270726F647563746976697479222C202272656D6F746520776F726B225D',1,0,'2024-05-15 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','0cef99db-9d5e-48af-b070-03b4c59c4a0c','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Project Management Methodologies','project-management-methodologies','Explore different project management approaches and find the right fit for your organization.','# Project Management Methodologies\n\nChoosing the right project management methodology can significantly impact project success. Here are the most popular approaches:\n\n## Waterfall\n\nA traditional, linear approach where each phase must be completed before the next begins.\n\n**Best for**: Well-defined projects with stable requirements\n\n## Agile\n\nAn iterative approach that emphasizes flexibility and customer collaboration.\n\n**Best for**: Projects with changing requirements and need for rapid delivery\n\n## Scrum\n\nA specific Agile framework using sprints and defined roles.\n\n**Best for**: Software development and complex product development\n\n## Kanban\n\nA visual workflow management method that limits work in progress.\n\n**Best for**: Continuous workflow and process improvement\n\n## Hybrid Approaches\n\nMany organizations combine elements from different methodologies to create a custom approach.',NULL,'Project Management',X'5B226D6574686F646F6C6F6779222C20226167696C65222C2022776174657266616C6C225D',1,0,'2024-04-01 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','1e1ec159-e50f-4416-9422-3d72d2a9ed4a','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Understanding Inventory Management','understanding-inventory-management','Master the fundamentals of inventory management and optimize your stock levels.','# Understanding Inventory Management\n\nEffective inventory management is crucial for business success. It involves overseeing the flow of goods from manufacturers to warehouses and from these facilities to point of sale.\n\n## Key Concepts\n\n### Stock Levels\n- **Minimum Stock**: The lowest quantity of an item you should have\n- **Maximum Stock**: The highest quantity you should maintain\n- **Reorder Point**: When to place new orders\n\n### Inventory Methods\n- **FIFO**: First In, First Out\n- **LIFO**: Last In, First Out\n- **Weighted Average**: Average cost method\n\n## Best Practices\n\n1. Regular audits and cycle counting\n2. Automated reorder points\n3. Supplier relationship management\n4. Demand forecasting',NULL,'How-To Guides',X'5B22696E76656E746F7279222C20226D616E6167656D656E74222C20227475746F7269616C225D',1,0,'2024-02-15 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','297a7b3a-f11e-40cb-9fa8-ec434283bea5','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Financial Reporting Best Practices','financial-reporting-best-practices','Essential practices for accurate and timely financial reporting in your organization.','# Financial Reporting Best Practices\n\nAccurate financial reporting is critical for business decision-making and compliance. Follow these best practices:\n\n## Key Principles\n\n### Accuracy\nEnsure all financial data is correct and verifiable.\n\n### Timeliness\nProduce reports promptly to support decision-making.\n\n### Consistency\nUse standardized methods and formats across all reports.\n\n### Transparency\nProvide clear explanations and supporting documentation.\n\n## Essential Reports\n\n1. **Income Statement**: Revenue and expenses\n2. **Balance Sheet**: Assets, liabilities, and equity\n3. **Cash Flow Statement**: Cash inflows and outflows\n4. **Budget vs. Actual**: Performance against budget\n\n## Automation Benefits\n\nModern ERP systems automate much of the reporting process, reducing errors and saving time.',NULL,'Finance',X'5B227265706F7274696E67222C202266696E616E6365222C2022636F6D706C69616E6365225D',1,1,'2024-03-15 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','2a672c6a-1599-4e21-a305-c39c6a8df1ad','2025-07-09 08:27:20','2025-07-09 08:27:20'),('ERP ROI: Measuring Success','erp-roi-measuring-success','Learn how to measure and maximize return on investment from your ERP implementation.','# ERP ROI: Measuring Success\n\nMeasuring return on investment (ROI) is crucial for justifying ERP expenses and optimizing system value.\n\n## ROI Calculation\n\n### Formula\nROI = (Benefits - Costs) / Costs × 100\n\n### Timeframe\nTypically measured over 3-5 years post-implementation.\n\n## Quantifiable Benefits\n\n### Cost Savings\n- Reduced labor costs through automation\n- Lower inventory carrying costs\n- Decreased IT maintenance expenses\n\n### Revenue Increases\n- Improved customer satisfaction\n- Faster order processing\n- Better inventory availability\n\n### Efficiency Gains\n- Reduced processing time\n- Eliminated duplicate data entry\n- Streamlined workflows\n\n## Intangible Benefits\n\n### Improved Decision Making\nBetter data leads to smarter business decisions.\n\n### Enhanced Compliance\nReduced risk of regulatory violations.\n\n### Competitive Advantage\nImproved agility and responsiveness.\n\n## Measuring Success\n\n1. Establish baseline metrics before implementation\n2. Track key performance indicators (KPIs)\n3. Regular reviews and assessments\n4. Continuous optimization',NULL,'Business Insights',X'5B22726F69222C20226D657472696373222C202273756363657373225D',1,1,'2024-06-01 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','57006b27-bb48-4739-a636-6e3f2ec280bc','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Welcome to Our ERP System','welcome-to-erp','Discover the power of our comprehensive ERP solution for modern businesses.','# Welcome to Our ERP System\n\nWe\'re excited to introduce you to our comprehensive Enterprise Resource Planning (ERP) system. Our platform brings together all aspects of your business operations into one unified solution.\n\n## Key Features\n\n- **Inventory Management**: Track stock levels, manage suppliers, and optimize your supply chain\n- **Sales & CRM**: Manage customer relationships and track sales performance\n- **Financial Management**: Handle invoicing, expenses, and financial reporting\n- **Project Management**: Plan, execute, and monitor projects effectively\n- **Human Resources**: Manage employee data and organizational structure\n\n## Getting Started\n\nOur system is designed to be intuitive and user-friendly. Whether you\'re a small business or a large enterprise, our ERP solution scales with your needs.',NULL,'Product Updates',X'5B22616E6E6F756E63656D656E74222C20226665617475726573222C202277656C636F6D65225D',1,1,'2024-01-15 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','69b6cfcf-9b9e-406b-9db8-21a66efef751','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Sales Pipeline Optimization','sales-pipeline-optimization','Learn strategies to optimize your sales pipeline and increase conversion rates.','# Sales Pipeline Optimization\n\nA well-optimized sales pipeline is essential for consistent revenue growth. Here\'s how to improve your sales process:\n\n## Pipeline Stages\n\n1. **Lead Generation**: Attract potential customers\n2. **Lead Qualification**: Identify serious prospects\n3. **Proposal**: Present your solution\n4. **Negotiation**: Handle objections and pricing\n5. **Closing**: Finalize the deal\n6. **Follow-up**: Ensure customer satisfaction\n\n## Optimization Strategies\n\n### Data-Driven Decisions\nUse analytics to identify bottlenecks and improvement opportunities.\n\n### Process Standardization\nCreate consistent procedures for each pipeline stage.\n\n### Technology Integration\nLeverage CRM tools to automate and streamline processes.',NULL,'Sales & Marketing',X'5B2273616C6573222C2022706970656C696E65222C20226F7074696D697A6174696F6E225D',1,0,'2024-03-01 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6a0dd5ca-f31b-4e04-b65e-ee02388693eb','2025-07-09 08:27:20','2025-07-09 08:27:20'),('5 Ways ERP Can Transform Your Business','5-ways-erp-transforms-business','Learn how implementing an ERP system can revolutionize your business operations and drive growth.','# 5 Ways ERP Can Transform Your Business\n\nImplementing an Enterprise Resource Planning (ERP) system can be a game-changer for businesses of all sizes. Here are five key ways ERP can transform your operations:\n\n## 1. Streamlined Operations\n\nERP systems integrate all business processes, eliminating data silos and reducing manual work.\n\n## 2. Real-time Visibility\n\nGet instant access to critical business data and make informed decisions quickly.\n\n## 3. Improved Efficiency\n\nAutomate routine tasks and workflows to boost productivity across your organization.\n\n## 4. Better Customer Service\n\nAccess complete customer information to provide superior service and support.\n\n## 5. Scalable Growth\n\nERP systems grow with your business, supporting expansion without major system overhauls.',NULL,'Business Insights',X'5B227472616E73666F726D6174696F6E222C2022656666696369656E6379222C202267726F777468225D',1,1,'2024-02-01 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','a5c6d72b-a5d6-42cb-a93e-320527bcd5d8','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Data Security in ERP Systems','data-security-erp-systems','Essential security measures to protect your business data in ERP environments.','# Data Security in ERP Systems\n\nProtecting sensitive business data is paramount in today\'s digital landscape. Here\'s how to secure your ERP system:\n\n## Security Fundamentals\n\n### Access Control\n- Role-based permissions\n- Multi-factor authentication\n- Regular access reviews\n\n### Data Encryption\n- Encryption at rest\n- Encryption in transit\n- Key management\n\n### Network Security\n- Firewalls and intrusion detection\n- VPN for remote access\n- Regular security updates\n\n## Compliance Considerations\n\n### GDPR\nEnsure proper handling of personal data for EU citizens.\n\n### SOX\nMaintain financial data integrity and audit trails.\n\n### Industry Standards\nFollow sector-specific security requirements.\n\n## Best Practices\n\n1. Regular security audits\n2. Employee training\n3. Incident response planning\n4. Backup and disaster recovery',NULL,'Security',X'5B227365637572697479222C2022636F6D706C69616E6365222C2022646174612070726F74656374696F6E225D',1,1,'2024-04-15 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e4f08cd8-a555-4e23-a59b-df5800fdeaf5','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Cloud vs On-Premise ERP','cloud-vs-onpremise-erp','Compare cloud and on-premise ERP deployments to make the right choice for your business.','# Cloud vs On-Premise ERP\n\nChoosing between cloud and on-premise ERP deployment is a critical decision. Here\'s a comprehensive comparison:\n\n## Cloud ERP Advantages\n\n### Lower Upfront Costs\nNo need for extensive hardware investments.\n\n### Scalability\nEasily scale resources up or down based on needs.\n\n### Automatic Updates\nVendor handles system updates and maintenance.\n\n### Remote Access\nAccess from anywhere with internet connection.\n\n## On-Premise ERP Advantages\n\n### Complete Control\nFull control over system and data.\n\n### Customization\nExtensive customization possibilities.\n\n### Security\nDirect control over security measures.\n\n### Compliance\nEasier to meet specific regulatory requirements.\n\n## Making the Decision\n\nConsider factors like:\n- Budget and cash flow\n- IT resources and expertise\n- Security requirements\n- Compliance needs\n- Growth plans',NULL,'Technology',X'5B22636C6F7564222C20226465706C6F796D656E74222C2022636F6D70617269736F6E225D',1,0,'2024-05-01 00:00:00','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','f46a872e-799f-4606-9ec1-31a7bce3e847','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "finance_expenses"
#

DROP TABLE IF EXISTS `finance_expenses`;
CREATE TABLE `finance_expenses` (
  `id` varchar(36) NOT NULL,
  `expense_number` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `amount` float NOT NULL,
  `vendor` varchar(255) NOT NULL,
  `expense_date` datetime NOT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now()),
  `created_by` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `expense_number` (`expense_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "finance_expenses"
#

INSERT INTO `finance_expenses` VALUES ('12b5ae9b-1559-4151-8ffd-b1c47c624559','EXP-2025-107','Consulting',1250.77,'Vendor H','2025-06-25 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('3172d5c9-81f2-4826-84f4-207e4a7e6b0d','EXP-2025-108','Maintenance',1400.96,'Vendor I','2025-06-23 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('39b2e019-12c3-43c4-b58e-8d7ae1adf40d','EXP-2025-104','Software',800.03,'Vendor E','2025-07-01 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('68a06ddf-d5be-4db6-8a5d-b6809b0c815e','EXP-2025-102','Utilities',500.09,'Vendor C','2025-07-05 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('769468b2-4e46-4d08-a9e3-52aa7a6c0750','EXP-2025-100','Travel',200.2,'Vendor A','2025-07-09 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('77d5f047-151c-4826-a588-46958a15330d','EXP-2025-105','Hardware',950.72,'Vendor F','2025-06-29 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('7b6ca659-5feb-48c9-bc94-f88c5880a07b','EXP-2025-109','Training',1550.86,'Vendor J','2025-06-21 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('8398a5a9-6e23-4ca4-9589-2e147514bf0f','EXP-2025-103','Rent',650.04,'Vendor D','2025-07-03 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('d6347467-f745-4ec9-968f-0777278a49c6','EXP-2025-106','Marketing',1100.08,'Vendor G','2025-06-27 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('e0ffc6cc-45f0-42e2-ba9b-832d781c82ac','EXP-2025-101','Office Supplies',350.86,'Vendor B','2025-07-07 15:27:20','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93');

#
# Structure for table "finance_invoices"
#

DROP TABLE IF EXISTS `finance_invoices`;
CREATE TABLE `finance_invoices` (
  `id` varchar(36) NOT NULL,
  `invoice_number` varchar(100) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `status` varchar(50) NOT NULL,
  `issue_date` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  `notes` text,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now()),
  `created_by` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invoice_number` (`invoice_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "finance_invoices"
#

INSERT INTO `finance_invoices` VALUES ('091bf1fb-7899-402d-82b3-44087d61a8e6','INV-2025-100','Amy Davis',500.59,'draft','2025-07-09 15:27:20','2025-08-08 15:27:20','Payment due in 30 days. Thank you for your business!','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('1ffb4689-0817-4dfb-9c09-2fc0b0de6578','INV-2025-103','Emma Taylor',1400.82,'overdue','2025-06-24 15:27:20','2025-07-30 15:27:20',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('2b312fc9-63fa-4ffa-a70d-f28da46c5779','INV-2025-105','Lisa Garcia',2000.14,'sent','2025-06-14 15:27:20','2025-07-24 15:27:20',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('3a96b706-68ba-4084-8480-9626ff590fe0','INV-2025-109','Sarah Wilson',3200.59,'sent','2025-05-25 15:27:20','2025-07-12 15:27:20',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('a763de51-10c0-4170-8b3d-9b050ec220b1','INV-2025-101','Chris Anderson',800.93,'sent','2025-07-04 15:27:20','2025-08-05 15:27:20',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('a9774205-af1b-4bf6-a586-377d1fa7fc22','INV-2025-108','David Brown',2900.3,'draft','2025-05-30 15:27:20','2025-07-15 15:27:20','Payment due in 30 days. Thank you for your business!','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('aaedd315-b2fa-47d6-8fc2-f8b33c7a3e87','INV-2025-104','John Smith',1700.73,'draft','2025-06-19 15:27:20','2025-07-27 15:27:20','Payment due in 30 days. Thank you for your business!','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('b48f1cb9-018d-45a2-809f-1c328ffe8da4','INV-2025-102','Tom Miller',1100.79,'paid','2025-06-29 15:27:20','2025-08-02 15:27:20','Payment due in 30 days. Thank you for your business!','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('cc897b4b-6d78-43c7-969b-af84c4c77f40','INV-2025-106','Jane Doe',2300.77,'paid','2025-06-09 15:27:20','2025-07-21 15:27:20','Payment due in 30 days. Thank you for your business!','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('f504e202-c461-4fdc-97ac-1802562164ef','INV-2025-107','Mike Johnson',2600.09,'overdue','2025-06-04 15:27:20','2025-07-18 15:27:20',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93');

#
# Structure for table "messages"
#

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `user_id` char(36) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "messages"
#


#
# Structure for table "profiles"
#

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `avatar_url` text,
  `bio` text,
  `job_title` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `account_locked` tinyint(1) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "profiles"
#

INSERT INTO `profiles` VALUES ('user2@erpnew.com','Jane','Doe',NULL,NULL,'Developer',NULL,NULL,NULL,0,'1539af53-217d-41e8-a810-eb25b6ffa353','2025-07-09 08:27:20','2025-07-09 08:27:20'),('admin@erpnew.com','Admin','User',NULL,NULL,'System Administrator',NULL,NULL,NULL,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','2025-07-09 08:27:19','2025-07-09 08:27:19'),('user1@erpnew.com','John','Smith',NULL,NULL,'Manager',NULL,NULL,NULL,0,'cc467def-8860-4679-9f6a-311ac3b1b1ca','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "invoices"
#

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `invoice_number` text NOT NULL,
  `client_name` text NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "invoices"
#


#
# Structure for table "inventory_items"
#

DROP TABLE IF EXISTS `inventory_items`;
CREATE TABLE `inventory_items` (
  `name` text NOT NULL,
  `category` text NOT NULL,
  `stock` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `supplier` text NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `inventory_items_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "inventory_items"
#

INSERT INTO `inventory_items` VALUES ('Webcam HD','Electronics',15,80.00,'Logitech','in stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','1460b750-3df7-4c50-a284-935e21494263','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Office Chair Ergonomic','Furniture',5,350.00,'Office Depot','low stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','245773ad-cf46-4979-a7cf-5b78f94605a0','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Monitor 27 inch 4K','Electronics',0,600.00,'Samsung','out of stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','42044120-ada9-4734-858e-595d0ed9ebbd','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Wireless Mouse','Accessories',50,45.00,'Logitech','in stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','5ec97615-2f47-4786-8bfb-f2a098d90ac9','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Laptop Dell XPS 13','Electronics',25,1200.00,'Dell Inc','in stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','5fa9d865-8d00-4c6a-bc0c-cfab2eb23985','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Printer HP LaserJet','Electronics',12,450.00,'HP Inc','in stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','76856b70-0131-4671-8b45-1485a945714c','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Mechanical Keyboard','Accessories',3,120.00,'Corsair','low stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','a5ea66e0-9c38-4ec4-99e3-2e44be0f6d77','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Desk Standing','Furniture',8,800.00,'IKEA','in stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','d44aba78-daaf-42a7-880b-680c1079b8cf','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Headset Noise Cancelling','Accessories',20,250.00,'Sony','in stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e1792315-797d-42ba-b67f-754c719228a9','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Conference Table','Furniture',2,1500.00,'Herman Miller','low stock','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e233c1c9-a3a6-48a3-8b24-6d825f93cf3c','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "groups"
#

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `name` text NOT NULL,
  `description` text,
  `created_by` char(36) NOT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "groups"
#


#
# Structure for table "group_members"
#

DROP TABLE IF EXISTS `group_members`;
CREATE TABLE `group_members` (
  `group_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `role` text,
  `joined_at` datetime NOT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "group_members"
#


#
# Structure for table "faqs"
#

DROP TABLE IF EXISTS `faqs`;
CREATE TABLE `faqs` (
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `category` text NOT NULL,
  `published` tinyint(1) NOT NULL,
  `order_index` int DEFAULT NULL,
  `created_by` char(36) DEFAULT NULL,
  `updated_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `faqs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`),
  CONSTRAINT `faqs_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "faqs"
#

INSERT INTO `faqs` VALUES ('Can I access the system from mobile devices?','Yes, our ERP system is fully responsive and works on tablets and smartphones. You can access all major functions from any device with an internet connection and a modern web browser.','Technical',1,6,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','03c6dc61-e362-4241-8b2b-ab91a4bfd2fc','2025-07-09 08:27:20','2025-07-09 08:27:20'),('What support options are available?','We offer multiple support channels including email support, live chat, comprehensive documentation, video tutorials, and community forums. Premium plans include phone support and dedicated account managers.','Support',1,10,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','170365ce-e0c4-4ebf-9f80-fdf2519143f6','2025-07-09 08:27:20','2025-07-09 08:27:20'),('How do I add new users to the system?','Admin users can add new users through the User Management section. Simply click \'Add New User\', enter their details, assign appropriate roles and permissions, and send them an invitation email.','User Management',1,9,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','339c5c03-c6a6-47fc-b02b-bf9714398992','2025-07-09 08:27:20','2025-07-09 08:27:20'),('How do I manage inventory items?','Navigate to the Inventory section to add, edit, and track your inventory items. You can set reorder points, track stock levels, and generate reports. The system will automatically alert you when items are running low.','Inventory',1,4,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','5719fcac-b76e-4309-b67d-d4459d5ee2e0','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Can I customize the dashboard?','Yes! Our dashboard is fully customizable. You can add, remove, and rearrange widgets to show the information most relevant to your role and responsibilities. Access the customization options from the dashboard settings menu.','Dashboard',1,3,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','9b467de8-fbe7-424e-a9d8-2125866d625e','2025-07-09 08:27:20','2025-07-09 08:27:20'),('What is an ERP system?','An Enterprise Resource Planning (ERP) system is a comprehensive business management software that integrates various business processes and functions into a single, unified system. It helps organizations manage their operations more efficiently by providing real-time visibility into all aspects of the business.','General',1,1,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','b8604f1d-4127-480e-b3b0-69daff5e99da','2025-07-09 08:27:20','2025-07-09 08:27:20'),('How do I get started with the system?','To get started, simply log in with your provided credentials, complete your profile setup, and familiarize yourself with the dashboard. We recommend starting with the Getting Started guide in our documentation section.','Getting Started',1,2,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c313eedc-c105-493d-9363-a678ee03b027','2025-07-09 08:27:20','2025-07-09 08:27:20'),('How do I generate reports?','Go to the Reports section where you\'ll find various pre-built reports for sales, inventory, finance, and more. You can also create custom reports using our report builder tool. Reports can be exported to PDF or Excel formats.','Reports',1,7,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c5d52a34-93d1-4ea3-98c8-7e59286ea492','2025-07-09 08:27:20','2025-07-09 08:27:20'),('What payment methods do you accept?','We accept all major credit cards, bank transfers, and digital payment methods. Payment processing is handled securely through our certified payment partners. Contact our billing team for enterprise payment options.','Billing',1,8,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','d0799e0b-2d3e-4078-8378-500334ff84d8','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Is my data secure?','Absolutely. We implement industry-standard security measures including data encryption, secure authentication, regular backups, and access controls. Your data is protected both in transit and at rest.','Security',1,5,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','eeae3489-a857-4a38-8b15-4165153ed06a','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "expenses"
#

DROP TABLE IF EXISTS `expenses`;
CREATE TABLE `expenses` (
  `expense_number` text NOT NULL,
  `category` text NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `vendor` text NOT NULL,
  `expense_date` date NOT NULL,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "expenses"
#


#
# Structure for table "employees"
#

DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `employee_id` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `department` text NOT NULL,
  `position` text NOT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `hire_date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `first_name` text,
  `last_name` text,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "employees"
#

INSERT INTO `employees` VALUES ('EMP006','Lisa Zhang','lisa.z@company.com',NULL,'Engineering','DevOps Engineer',80000.00,'2023-06-01','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','36ae7da9-eec9-462d-8f2f-330bf6cc5cd0','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP009','Kevin Davis','kevin.d@company.com',NULL,'IT','System Administrator',72000.00,'2023-09-10','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6ad6c747-43ea-4ab4-88f2-a4f7809ce268','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP005','Michael Brown','michael.b@company.com',NULL,'Finance','Financial Analyst',70000.00,'2023-05-20','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6df40f03-a395-497c-87cf-1e8a16b2f0fb','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP002','Maria Rodriguez','maria.r@company.com',NULL,'Sales','Sales Manager',85000.00,'2023-02-01','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','aac7fc7b-a132-4104-b72d-0c771faeea84','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP010','Rachel Green','rachel.g@company.com',NULL,'Design','UI/UX Designer',68000.00,'2023-10-05','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','ae9634c4-e937-4afc-96f2-38a11bdbbdaa','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP007','Daniel Kim','daniel.k@company.com',NULL,'Sales','Sales Representative',60000.00,'2023-07-15','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c712747d-a6a4-49da-ab69-be9e20040b61','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP001','Robert Johnson','robert.j@company.com',NULL,'Engineering','Software Engineer',75000.00,'2023-01-15','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','d2671b42-9d6a-4310-93da-559b716942d7','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP003','James Wilson','james.w@company.com',NULL,'HR','HR Specialist',65000.00,'2023-03-10','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','d5824447-e7ce-4cb2-82d6-54fb0dbde1cb','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP004','Jennifer Lee','jennifer.l@company.com',NULL,'Marketing','Marketing Coordinator',55000.00,'2023-04-05','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e0ecd80c-ba18-45b9-b87d-8d004e3bd9a0','2025-07-09 08:27:20','2025-07-09 08:27:20'),('EMP008','Amanda Smith','amanda.s@company.com',NULL,'Operations','Operations Manager',90000.00,'2023-08-01','active',NULL,NULL,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e934eef3-c628-48ef-a882-9ba312a6a1d5','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "leave_requests"
#

DROP TABLE IF EXISTS `leave_requests`;
CREATE TABLE `leave_requests` (
  `employee_id` char(36) DEFAULT NULL,
  `leave_type` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `days_requested` int NOT NULL,
  `reason` text,
  `status` varchar(50) NOT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `leave_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "leave_requests"
#


#
# Structure for table "docs"
#

DROP TABLE IF EXISTS `docs`;
CREATE TABLE `docs` (
  `title` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` text NOT NULL,
  `tags` json DEFAULT NULL,
  `published` tinyint(1) NOT NULL,
  `featured` tinyint(1) NOT NULL,
  `created_by` char(36) DEFAULT NULL,
  `updated_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `docs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`),
  CONSTRAINT `docs_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "docs"
#

INSERT INTO `docs` VALUES ('User Management','user-management','# User Management\n\nLearn how to manage users in the system.\n\n## Adding Users\n\n- Navigate to User Management\n- Click Add New User\n- Fill in the required information','Administration',X'5B227573657273222C202261646D696E222C20226D616E6167656D656E74225D',1,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','1345613f-973d-4b4e-b793-4146a1a0acb3','2025-07-09 08:27:20','2025-07-09 08:27:20'),('API Documentation','api-documentation','# API Documentation\n\nLearn how to use our REST API.\n\n## Authentication\n\nUse JWT tokens for API access.\n\n## Endpoints\n\n- GET /api/v1/users\n- POST /api/v1/users','Developers',X'5B22617069222C2022646576656C6F706D656E74222C2022696E746567726174696F6E225D',1,1,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','28790f56-e788-4d6f-837b-6fcd5f6221e9','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Inventory Management','inventory-management','# Inventory Management\n\nManage your inventory efficiently.\n\n## Adding Items\n\n1. Go to Inventory section\n2. Click Add New Item\n3. Enter item details','Inventory',X'5B22696E76656E746F7279222C20226974656D73222C202273746F636B225D',1,1,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','384ffe71-1dbf-4fc0-873d-75a148f50087','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Getting Started Guide','getting-started','# Getting Started\n\nWelcome to our ERP system! This guide will help you get started.\n\n## Initial Setup\n\n1. Log in with your credentials\n2. Configure your profile\n3. Set up your workspace','Getting Started',X'5B227475746F7269616C222C2022626173696373222C20227365747570225D',1,1,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','4bed1b2a-ac04-4b3d-8a27-8b2cf0303252','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Project Management','project-management','# Project Management\n\nManage projects from start to finish.\n\n## Creating Projects\n\n1. Access Projects module\n2. Define project scope\n3. Assign team members','Projects',X'5B2270726F6A65637473222C20226D616E6167656D656E74222C2022706C616E6E696E67225D',1,1,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','5c6ca80d-9129-40cf-a68a-d8a5115f42d2','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Best Practices','best-practices','# Best Practices\n\nRecommended practices for system usage.\n\n## Data Entry\n\n- Use consistent formats\n- Validate before saving\n- Regular backups','Getting Started',X'5B22626573742D707261637469636573222C202267756964656C696E6573222C202274697073225D',1,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','5db57559-13db-4caa-87ed-9c8ba3d77cd0','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Financial Reports','financial-reports','# Financial Reports\n\nGenerate comprehensive financial reports.\n\n## Types of Reports\n\n- Revenue reports\n- Expense tracking\n- Profit analysis','Finance',X'5B2266696E616E6365222C20227265706F727473222C2022616E616C7974696373225D',1,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','9bfe98e4-3901-4f36-8ac8-48a777aea450','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Troubleshooting Guide','troubleshooting','# Troubleshooting Guide\n\nCommon issues and their solutions.\n\n## Login Issues\n\n- Check credentials\n- Clear browser cache\n- Contact support','Support',X'5B2274726F75626C6573686F6F74696E67222C2022737570706F7274222C202268656C70225D',1,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','d2dc5f22-1c21-4ff2-b09b-f2cbd919ebc9','2025-07-09 08:27:20','2025-07-09 08:27:20'),('System Configuration','system-configuration','# System Configuration\n\nConfigure system settings for optimal performance.\n\n## General Settings\n\n- Company information\n- Currency settings\n- Time zones','Administration',X'5B22636F6E66696775726174696F6E222C202273657474696E6773222C202261646D696E225D',1,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','d934a45a-27d6-404e-b7c6-f7c0e6d41726','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Sales Process','sales-process','# Sales Process\n\nUnderstand the complete sales workflow.\n\n## Creating Sales Leads\n\n- Navigate to Sales section\n- Create new lead\n- Track progress','Sales',X'5B2273616C6573222C20226C65616473222C2022776F726B666C6F77225D',1,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','ee46983a-7b90-4c59-965d-7fa9863c36da','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "customers"
#

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `company` text,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "customers"
#

INSERT INTO `customers` VALUES ('Amy Davis','amy.davis@example.com','555-0108','Davis Tech','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','66d7c5f8-4a81-41c8-8bc9-c78ecfe91c96','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Chris Anderson','chris.anderson@example.com','555-0109','Anderson Ltd','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6a2072e5-61b7-4663-81bb-eacaaf664276','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Tom Miller','tom.miller@example.com','555-0107','Miller Group','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6f4fe348-42e9-4e7c-b31c-6dacc4f68763','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Emma Taylor','emma.taylor@example.com','555-0110','Taylor Systems','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','8d285f78-d25f-429f-9f2b-00111dea5ec4','2025-07-09 08:27:20','2025-07-09 08:27:20'),('John Smith','john.smith@example.com','555-0101','Smith Industries','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','9c396356-bdd2-4233-adff-e65bee52e7c4','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Lisa Garcia','lisa.garcia@example.com','555-0106','Garcia Solutions','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','a1a1b14c-671a-4624-8739-48770874d1bf','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Jane Doe','jane.doe@example.com','555-0102','Doe Enterprises','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c430d574-d287-4afb-b38c-c79f1dde0b43','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Mike Johnson','mike.johnson@example.com','555-0103','Johnson Corp','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c504a509-855d-4b89-9c1b-21e0d80270ae','2025-07-09 08:27:20','2025-07-09 08:27:20'),('David Brown','david.brown@example.com','555-0105','Brown & Associates','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c54bedc9-6559-4248-9afa-36801c74b640','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Sarah Wilson','sarah.wilson@example.com','555-0104','Wilson LLC','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','f4407258-8987-4af1-9cfe-eff4971e9ec3','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "chat_typing_indicators"
#

DROP TABLE IF EXISTS `chat_typing_indicators`;
CREATE TABLE `chat_typing_indicators` (
  `user_id` char(36) NOT NULL,
  `is_typing` tinyint(1) NOT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `chat_typing_indicators_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "chat_typing_indicators"
#


#
# Structure for table "chat_messages"
#

DROP TABLE IF EXISTS `chat_messages`;
CREATE TABLE `chat_messages` (
  `user_id` char(36) NOT NULL,
  `content` text NOT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "chat_messages"
#

INSERT INTO `chat_messages` VALUES ('6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','Great to have you all aboard! Let\'s make this project successful.','192c585b-7835-49a5-a01b-fc33a9a67d82','2025-07-09 11:27:20','2025-07-09 11:27:20'),('6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','Feel free to ask questions and collaborate here.','5a0dc98b-0747-4af4-a077-641d74969d61','2025-07-09 14:27:20','2025-07-09 14:27:20'),('cc467def-8860-4679-9f6a-311ac3b1b1ca','Looking forward to our project collaboration!','616632b7-65c9-4226-825a-13de8ebdc3f2','2025-07-09 12:27:20','2025-07-09 12:27:20'),('6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','Hi everyone! Excited to be working with the team.','8f867982-13dd-4a11-b6b6-1dad40ae21c9','2025-07-09 13:27:20','2025-07-09 13:27:20'),('6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','Welcome to the team chat! 🎉','9198be32-6eff-46a5-9323-c677b20718f4','2025-07-09 15:27:20','2025-07-09 15:27:20');

#
# Structure for table "admin_user_actions"
#

DROP TABLE IF EXISTS `admin_user_actions`;
CREATE TABLE `admin_user_actions` (
  `admin_id` char(36) NOT NULL,
  `target_user_id` char(36) NOT NULL,
  `action_type` varchar(255) NOT NULL,
  `details` json DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `target_user_id` (`target_user_id`),
  CONSTRAINT `admin_user_actions_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `profiles` (`id`),
  CONSTRAINT `admin_user_actions_ibfk_2` FOREIGN KEY (`target_user_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "admin_user_actions"
#


#
# Structure for table "projects"
#

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `name` text NOT NULL,
  `description` text,
  `status` varchar(50) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `budget` decimal(12,2) DEFAULT NULL,
  `progress` int DEFAULT NULL,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "projects"
#

INSERT INTO `projects` VALUES ('Mobile App Development','Native iOS and Android app','planning','2024-03-01','2024-12-31',150000.00,10,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','0676cee5-04c5-47f3-b57c-61c921d37237','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Website Redesign','Complete overhaul of company website','active','2024-01-01','2024-06-30',50000.00,65,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','111f8ab7-680a-4d0f-a6b5-f3dda83412a2','2025-07-09 08:27:20','2025-07-09 08:27:20'),('API Integration','Third-party API integrations','active','2024-02-15','2024-06-15',40000.00,55,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','1de59617-f6d7-4515-a49d-28edc9fb3ca3','2025-07-09 08:27:20','2025-07-09 08:27:20'),('ERP System Upgrade','Upgrade legacy ERP system','active','2024-02-01','2024-08-31',200000.00,40,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','41345772-0701-406e-8a5d-d596349d029b','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Training Program','Employee training on new systems','on-hold','2024-05-01','2024-07-31',30000.00,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','7c90d76c-b692-4710-aa05-eaeca0f8a1b9','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Database Optimization','Optimize database performance','completed','2024-01-01','2024-03-31',20000.00,100,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','93bdfad9-8971-4213-adde-b76020aa907d','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Security Audit','Comprehensive security assessment','active','2024-03-15','2024-05-15',25000.00,80,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','b42fd5ae-b1b7-4a4d-b96a-d80de13fa2b7','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Marketing Campaign','Q2 digital marketing campaign','planning','2024-04-01','2024-06-30',35000.00,20,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c2c69c02-2536-4d85-b667-fff3f9dd9df4','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Office Renovation','Renovate main office space','active','2024-03-01','2024-07-31',80000.00,30,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e4899d8b-0318-405f-8837-98aa9dc5b4e6','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Data Migration','Migrate data to cloud infrastructure','completed','2023-10-01','2024-01-31',75000.00,100,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','ec99b14b-9539-4736-8096-3c48ded0b793','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "reports"
#

DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports` (
  `title` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` text,
  `data` json DEFAULT NULL,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "reports"
#


#
# Structure for table "sales_leads"
#

DROP TABLE IF EXISTS `sales_leads`;
CREATE TABLE `sales_leads` (
  `name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `company` text,
  `status` varchar(50) NOT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `notes` text,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `sales_leads_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "sales_leads"
#

INSERT INTO `sales_leads` VALUES ('Sofia Martinez','sofia.m@prospect.com',NULL,'Martinez Ltd','contacted',8500.00,'Scheduled for demo next week','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','1dc9fa4f-e8ee-4135-a2bb-26eeae96a9d9','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Nina Patel','nina.p@prospect.com',NULL,'Patel Solutions','new',12000.00,'Referral from existing customer','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','2101005a-20fc-42d7-816f-df734db97cc5','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Lucas Brown','lucas.b@prospect.com',NULL,'Brown Systems','contacted',14000.00,'Interested in custom integration','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','741b816c-52b9-4dcd-8943-013c273507cb','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Elena Rodriguez','elena.r@prospect.com',NULL,'Rodriguez Group','lost',5000.00,'Chose competitor solution','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','a091169d-b103-4c91-9822-b5c139d9ee9f','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Isabella White','isabella.w@prospect.com',NULL,'White & Associates','new',7500.00,'Small business lead','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','a30d7501-aab0-4eef-8dfc-525234bb2274','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Maya Singh','maya.s@prospect.com',NULL,'Singh Consulting','qualified',22000.00,'Decision maker identified','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','afd747ac-734d-46bf-a9ce-8556e898e73a','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Alex Thompson','alex.t@prospect.com',NULL,'Thompson Corp','new',15000.00,'Interested in our enterprise solution','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','b4c798cd-84ac-4164-9b63-a123f093dfc2','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Oliver Chen','oliver.c@prospect.com',NULL,'Chen Technologies','qualified',30000.00,'Large enterprise client','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c1bb4783-8152-4005-bc6c-16fe72080b45','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Marcus Johnson','marcus.j@prospect.com',NULL,'Johnson Enterprises','contacted',18000.00,'Comparing with competitors','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e90f1dd4-06f3-4407-b8fe-f025827e67e2','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Ryan O\'Connor','ryan.o@prospect.com',NULL,'O\'Connor Industries','qualified',25000.00,'Ready to proceed with proposal','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','f6ab22b5-f3a9-4ea4-b5a6-b2e730d154ad','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "settings"
#

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `company_name` text NOT NULL,
  `currency` text NOT NULL,
  `timezone` text NOT NULL,
  `language` text NOT NULL,
  `two_factor_auth` tinyint(1) NOT NULL,
  `password_expiry` tinyint(1) NOT NULL,
  `login_alerts` tinyint(1) NOT NULL,
  `email_notifications` tinyint(1) NOT NULL,
  `push_notifications` tinyint(1) NOT NULL,
  `sms_alerts` tinyint(1) NOT NULL,
  `auto_backup` tinyint(1) NOT NULL,
  `api_access` tinyint(1) NOT NULL,
  `debug_mode` tinyint(1) NOT NULL,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "settings"
#


#
# Structure for table "suppliers"
#

DROP TABLE IF EXISTS `suppliers`;
CREATE TABLE `suppliers` (
  `name` text NOT NULL,
  `contact_person` text,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `suppliers_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "suppliers"
#

INSERT INTO `suppliers` VALUES ('Software Solutions','Amy Software','amy@softwaresolutions.com','555-1006','987 Software Lane, Software City, SC 86420','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','18d08d16-ab19-4e98-a7f2-861c0b2b9128','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Office Supplies Co','Sarah Sales','sarah@officesupplies.com','555-1002','456 Supply Ave, Supply Town, ST 67890','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','1b661fb6-84b4-48f1-beb3-250372ad4d5d','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Furniture World','Mike Furniture','mike@furnitureworld.com','555-1003','789 Furniture Blvd, Furniture City, FC 13579','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','5abd4559-f5f8-4d46-b355-46e45f098c48','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Electronics Plus','Lisa Electronics','lisa@electronicsplus.com','555-1004','321 Electronics Way, Electronic City, EC 24680','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','9c72855d-6752-4171-a30d-ba80750c9e06','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Tech Solutions Inc','John Manager','john@techsolutions.com','555-1001','123 Tech Street, Tech City, TC 12345','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e2f00adc-0d26-4093-aafd-8df0820b0fbe','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Industrial Equipment LLC','David Industrial','david@industrial.com','555-1005','654 Industrial Park, Industrial Town, IT 97531','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e38a2e92-fc84-4666-8f87-49417eb62acc','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Hardware Store','Tom Hardware','tom@hardwarestore.com','555-1007','147 Hardware St, Hardware Town, HT 75319','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e48e3c6c-92cd-46e7-8f92-e66e593be75c','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Security Solutions','Rachel Security','rachel@securitysolutions.com','555-1010','741 Security Blvd, Security City, SC 42086','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','f64635e5-4a19-406b-91d4-366439a7017e','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Cloud Services','Chris Cloud','chris@cloudservices.com','555-1009','369 Cloud Road, Cloud Town, CT 53197','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','f86bcae9-4ee0-44cf-a8dc-e52e6af8dfa2','2025-07-09 08:27:20','2025-07-09 08:27:20'),('Network Systems','Emma Network','emma@networksystems.com','555-1008','258 Network Ave, Network City, NC 64208','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','f8fca294-90ce-476a-92ba-a42450c92056','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "purchase_orders"
#

DROP TABLE IF EXISTS `purchase_orders`;
CREATE TABLE `purchase_orders` (
  `po_number` text NOT NULL,
  `supplier_id` char(36) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `total_amount` decimal(12,2) NOT NULL,
  `order_date` date NOT NULL,
  `expected_delivery` date DEFAULT NULL,
  `notes` text,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `purchase_orders_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  CONSTRAINT `purchase_orders_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "purchase_orders"
#

INSERT INTO `purchase_orders` VALUES ('PO-2025-001','18d08d16-ab19-4e98-a7f2-861c0b2b9128','pending',2500.00,'2025-01-05','2025-01-20','Urgent delivery required','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','038595bb-d174-4bd4-9462-3f555ae7cbe0','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-008','f64635e5-4a19-406b-91d4-366439a7017e','approved',3600.00,'2025-02-10','2025-02-25','Quality inspection required','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','22a9931d-ea79-41e4-a189-f8e7ea81b6c9','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-005','e2f00adc-0d26-4093-aafd-8df0820b0fbe','approved',4500.00,'2025-01-25','2025-02-10','Bulk order discount applied','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','3d9235fd-4855-4d2b-951d-fb14bbab8e90','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-004','9c72855d-6752-4171-a30d-ba80750c9e06','pending',950.00,'2025-01-20','2025-02-05','Awaiting approval','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','51f9b437-1b6c-43f8-afbf-ced67af3e20d','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-002','1b661fb6-84b4-48f1-beb3-250372ad4d5d','approved',1800.00,'2025-01-10','2025-01-25','Standard delivery','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','547bcd0b-7031-4918-ab37-69fa9ea826e3','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-007','e48e3c6c-92cd-46e7-8f92-e66e593be75c','pending',2800.00,'2025-02-05','2025-02-20','Payment terms: Net 30','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6b49dfaf-b80a-4410-9fd8-f781ddf3a6af','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-006','e38a2e92-fc84-4666-8f87-49417eb62acc','delivered',1200.00,'2025-02-01','2025-02-15','Express delivery','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','6e57691e-5161-44ee-9ca4-28fc31f44c4a','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-010','f8fca294-90ce-476a-92ba-a42450c92056','pending',5200.00,'2025-02-20','2025-03-05','Large order - special handling','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','c878367c-21e1-4760-849e-d29f6e7a9270','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-003','5abd4559-f5f8-4d46-b355-46e45f098c48','delivered',3200.00,'2025-01-15','2025-02-01','Delivered on time','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','e8ba57cd-88bb-402d-b89f-2e0f2e9c3800','2025-07-09 08:27:20','2025-07-09 08:27:20'),('PO-2025-009','f86bcae9-4ee0-44cf-a8dc-e52e6af8dfa2','delivered',1500.00,'2025-02-15','2025-03-01','Partial delivery accepted','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','fd307e0e-f563-4551-97c1-944fbaf0aa3c','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "system_settings"
#

DROP TABLE IF EXISTS `system_settings`;
CREATE TABLE `system_settings` (
  `auto_backup` tinyint(1) NOT NULL,
  `api_access` tinyint(1) NOT NULL,
  `debug_mode` tinyint(1) NOT NULL,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `system_settings_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "system_settings"
#

INSERT INTO `system_settings` VALUES (1,0,0,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','94a8209d-b55a-485e-95c3-21f5333e8a68','2025-07-09 15:27:20','2025-07-09 15:27:20');

#
# Structure for table "tickets"
#

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets` (
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` enum('open','in_progress','resolved','closed') NOT NULL,
  `priority` enum('low','medium','high','critical') NOT NULL,
  `created_by` char(36) NOT NULL,
  `assigned_to` char(36) DEFAULT NULL,
  `group_id` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `assigned_to` (`assigned_to`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `profiles` (`id`),
  CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "tickets"
#


#
# Structure for table "ticket_comments"
#

DROP TABLE IF EXISTS `ticket_comments`;
CREATE TABLE `ticket_comments` (
  `ticket_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `comment` text NOT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ticket_comments_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  CONSTRAINT `ticket_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "ticket_comments"
#


#
# Structure for table "transactions"
#

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` varchar(36) NOT NULL,
  `type` varchar(50) NOT NULL,
  `amount` float NOT NULL,
  `description` text,
  `date` datetime NOT NULL,
  `category` varchar(100) NOT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime DEFAULT (now()),
  `created_by` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "transactions"
#

INSERT INTO `transactions` VALUES ('0b45b948-cd85-461e-86e3-837fb99c5a64','transfer',2100.21,'Sample transaction 9','2025-06-15 15:27:20','Software','REF-2025-108','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('17d2cf69-14c0-4621-b27e-4dc4016f5eb7','transfer',600.61,'Sample transaction 3','2025-07-03 15:27:20','Rent','REF-2025-102','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('315128f6-f562-4f8a-8de8-3e1cad92a4b0','transfer',1350.66,'Sample transaction 6','2025-06-24 15:27:20','Marketing',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('374bed1d-41ff-41c4-93ea-bbe1fc7570f9','expense',1850.19,'Sample transaction 8','2025-06-18 15:27:20','Consulting',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('3d007953-9df5-4d06-af71-3d4de298c901','income',850.13,'Sample transaction 4','2025-06-30 15:27:20','Utilities',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('4ecd3e75-84df-41e5-b463-b9d979ae0b63','income',1600.98,'Sample transaction 7','2025-06-21 15:27:20','Travel','REF-2025-106','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('509068a0-74f2-4075-825b-7113a3bc474d','income',100.28,'Sample transaction 1','2025-07-09 15:27:20','Sales','REF-2025-100','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('5a145628-92e2-4947-85b3-19e4b7b12534','income',2350.8,'Sample transaction 10','2025-06-12 15:27:20','Hardware',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('98c71616-e6e6-4792-a260-737c56132e35','expense',350.66,'Sample transaction 2','2025-07-06 15:27:20','Salary',NULL,'2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93'),('c38c7196-3b25-4bba-9017-d4ec59251e3d','expense',1100.63,'Sample transaction 5','2025-06-27 15:27:20','Office Supplies','REF-2025-104','2025-07-09 15:27:20','2025-07-09 15:27:20','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93');

#
# Structure for table "typing_indicators"
#

DROP TABLE IF EXISTS `typing_indicators`;
CREATE TABLE `typing_indicators` (
  `user_id` char(36) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `is_typing` tinyint(1) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "typing_indicators"
#


#
# Structure for table "user_preferences"
#

DROP TABLE IF EXISTS `user_preferences`;
CREATE TABLE `user_preferences` (
  `user_id` char(36) NOT NULL,
  `email_notifications` tinyint(1) NOT NULL,
  `push_notifications` tinyint(1) NOT NULL,
  `project_updates` tinyint(1) NOT NULL,
  `task_assignments` tinyint(1) NOT NULL,
  `system_maintenance` tinyint(1) NOT NULL,
  `dark_mode` tinyint(1) NOT NULL,
  `compact_view` tinyint(1) NOT NULL,
  `language` text NOT NULL,
  `timezone` text NOT NULL,
  `two_factor_auth` tinyint(1) NOT NULL,
  `password_expiry` tinyint(1) NOT NULL,
  `login_alerts` tinyint(1) NOT NULL,
  `sms_alerts` tinyint(1) NOT NULL,
  `company_name` text,
  `currency` text,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "user_preferences"
#


#
# Structure for table "user_profiles"
#

DROP TABLE IF EXISTS `user_profiles`;
CREATE TABLE `user_profiles` (
  `user_id` char(36) NOT NULL,
  `first_name` text,
  `last_name` text,
  `phone` text,
  `job_title` text,
  `bio` text,
  `avatar_url` text,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "user_profiles"
#


#
# Structure for table "user_roles"
#

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `user_id` char(36) NOT NULL,
  `role` enum('admin','moderator','user') NOT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "user_roles"
#


#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `password_hash` text NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "users"
#

INSERT INTO `users` VALUES ('user2@erpnew.com','$2b$12$VFpxYsTS7ozrTijtYSCFAORAXggZB1BqKmMQ49wq9JXqEECd9cg0a',1,1,'1539af53-217d-41e8-a810-eb25b6ffa353','2025-07-09 08:27:20','2025-07-09 08:27:20'),('admin@erpnew.com','$2b$12$JraRl0AYHZsPLUVh7L8ST.GPp3aAbNZID3PatQM.FyB009foz1d2G',1,1,'6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','2025-07-09 08:27:19','2025-07-09 08:27:19'),('user1@erpnew.com','$2b$12$zn6VDVf5tlAR6oEPwsHz0.foZO.QR2H9vL1QmA6AA0E.SlMPXzi9K',1,1,'cc467def-8860-4679-9f6a-311ac3b1b1ca','2025-07-09 08:27:20','2025-07-09 08:27:20');

#
# Structure for table "work_orders"
#

DROP TABLE IF EXISTS `work_orders`;
CREATE TABLE `work_orders` (
  `work_order_id` text NOT NULL,
  `product` text NOT NULL,
  `quantity` int NOT NULL,
  `status` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `due_date` date NOT NULL,
  `created_by` char(36) DEFAULT NULL,
  `id` char(36) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `work_orders_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

#
# Data for table "work_orders"
#

INSERT INTO `work_orders` VALUES ('WO-2024-004','Database Report',5,'completed','2024-01-15','2024-02-15','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','49a787db-3817-4b2f-a1d6-7e04ab1138db','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-006','Security Patch',1,'completed','2024-03-01','2024-03-15','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','5e12bdd0-ef1c-46b9-8dc0-a83d6a1cf5da','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-008','System Backup',1,'in-progress','2024-03-15','2024-04-15','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','61779c08-b6b7-4a74-b6e6-1e8c1547a65a','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-005','API Integration',1,'in-progress','2024-02-15','2024-04-01','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','639a5dac-3dd2-4545-b59e-c1fd3dae9859','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-009','Performance Optimization',1,'completed','2024-02-01','2024-03-01','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','70ab242b-3b72-4291-b34a-b34d79eea64c','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-010','Data Migration Script',1,'planning','2024-04-15','2024-06-01','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','853c8781-20e8-4a13-8ae0-d86dd3feef44','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-007','User Training Material',10,'planning','2024-04-01','2024-05-31','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','cad3788a-05f5-4749-b67e-2face72809b3','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-001','Custom Software Module',1,'completed','2024-01-01','2024-02-01','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','d4f35679-97f5-49a8-a8e1-56ef60eeec35','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-003','Mobile App Feature',2,'planning','2024-03-01','2024-04-30','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','dfa59a6a-a362-4f8b-b2d5-5afd472bc601','2025-07-09 08:27:20','2025-07-09 08:27:20'),('WO-2024-002','Website Landing Page',3,'in-progress','2024-02-01','2024-03-15','6d90bcc2-6e09-4f0c-83d4-736c1eac9b93','eefd54b9-7456-4848-ae7e-740c35153354','2025-07-09 08:27:20','2025-07-09 08:27:20');
