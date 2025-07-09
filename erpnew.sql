# Host: localhost  (Version 8.0.30)
# Date: 2025-07-09 18:50:24
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

INSERT INTO `blogs` VALUES ('ERP ROI: Measuring Success','erp-roi-measuring-success','Learn how to measure and maximize return on investment from your ERP implementation.','# ERP ROI: Measuring Success\n\nMeasuring return on investment (ROI) is crucial for justifying ERP expenses and optimizing system value.\n\n## ROI Calculation\n\n### Formula\nROI = (Benefits - Costs) / Costs × 100\n\n### Timeframe\nTypically measured over 3-5 years post-implementation.\n\n## Quantifiable Benefits\n\n### Cost Savings\n- Reduced labor costs through automation\n- Lower inventory carrying costs\n- Decreased IT maintenance expenses\n\n### Revenue Increases\n- Improved customer satisfaction\n- Faster order processing\n- Better inventory availability\n\n### Efficiency Gains\n- Reduced processing time\n- Eliminated duplicate data entry\n- Streamlined workflows\n\n## Intangible Benefits\n\n### Improved Decision Making\nBetter data leads to smarter business decisions.\n\n### Enhanced Compliance\nReduced risk of regulatory violations.\n\n### Competitive Advantage\nImproved agility and responsiveness.\n\n## Measuring Success\n\n1. Establish baseline metrics before implementation\n2. Track key performance indicators (KPIs)\n3. Regular reviews and assessments\n4. Continuous optimization',NULL,'Business Insights',X'5B22726F69222C20226D657472696373222C202273756363657373225D',1,1,'2024-06-01 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','08919a81-86f8-4cac-b56a-311629fd3be4','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Financial Reporting Best Practices','financial-reporting-best-practices','Essential practices for accurate and timely financial reporting in your organization.','# Financial Reporting Best Practices\n\nAccurate financial reporting is critical for business decision-making and compliance. Follow these best practices:\n\n## Key Principles\n\n### Accuracy\nEnsure all financial data is correct and verifiable.\n\n### Timeliness\nProduce reports promptly to support decision-making.\n\n### Consistency\nUse standardized methods and formats across all reports.\n\n### Transparency\nProvide clear explanations and supporting documentation.\n\n## Essential Reports\n\n1. **Income Statement**: Revenue and expenses\n2. **Balance Sheet**: Assets, liabilities, and equity\n3. **Cash Flow Statement**: Cash inflows and outflows\n4. **Budget vs. Actual**: Performance against budget\n\n## Automation Benefits\n\nModern ERP systems automate much of the reporting process, reducing errors and saving time.',NULL,'Finance',X'5B227265706F7274696E67222C202266696E616E6365222C2022636F6D706C69616E6365225D',1,1,'2024-03-15 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','0ea66ba6-fede-4a16-b178-aec93f52d7ff','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Mobile ERP: Business on the Go','mobile-erp-business-on-go','Discover how mobile ERP solutions enable productivity and decision-making anywhere.','# Mobile ERP: Business on the Go\n\nMobile ERP solutions are transforming how businesses operate, enabling real-time access to critical information from anywhere.\n\n## Mobile Capabilities\n\n### Real-time Data Access\nAccess dashboards, reports, and key metrics on mobile devices.\n\n### Workflow Approvals\nApprove purchase orders, expense reports, and other documents remotely.\n\n### Field Operations\nUpdate inventory, record transactions, and manage projects from the field.\n\n### Customer Interactions\nAccess customer information during meetings and site visits.\n\n## Benefits\n\n### Increased Productivity\nEmployees can work efficiently regardless of location.\n\n### Faster Decision Making\nReal-time data enables quick, informed decisions.\n\n### Improved Customer Service\nInstant access to customer data improves service quality.\n\n### Cost Reduction\nReduce travel and office overhead costs.\n\n## Implementation Considerations\n\n1. Security protocols for mobile access\n2. User interface optimization for mobile devices\n3. Offline capability requirements\n4. Device management policies',NULL,'Technology',X'5B226D6F62696C65222C202270726F647563746976697479222C202272656D6F746520776F726B225D',1,0,'2024-05-15 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2459acb1-8af9-4212-a95c-c0bc21abce44','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Project Management Methodologies','project-management-methodologies','Explore different project management approaches and find the right fit for your organization.','# Project Management Methodologies\n\nChoosing the right project management methodology can significantly impact project success. Here are the most popular approaches:\n\n## Waterfall\n\nA traditional, linear approach where each phase must be completed before the next begins.\n\n**Best for**: Well-defined projects with stable requirements\n\n## Agile\n\nAn iterative approach that emphasizes flexibility and customer collaboration.\n\n**Best for**: Projects with changing requirements and need for rapid delivery\n\n## Scrum\n\nA specific Agile framework using sprints and defined roles.\n\n**Best for**: Software development and complex product development\n\n## Kanban\n\nA visual workflow management method that limits work in progress.\n\n**Best for**: Continuous workflow and process improvement\n\n## Hybrid Approaches\n\nMany organizations combine elements from different methodologies to create a custom approach.',NULL,'Project Management',X'5B226D6574686F646F6C6F6779222C20226167696C65222C2022776174657266616C6C225D',1,0,'2024-04-01 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','3da0396b-7f19-46cb-bb15-6cf85fc2f5f3','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Understanding Inventory Management','understanding-inventory-management','Master the fundamentals of inventory management and optimize your stock levels.','# Understanding Inventory Management\n\nEffective inventory management is crucial for business success. It involves overseeing the flow of goods from manufacturers to warehouses and from these facilities to point of sale.\n\n## Key Concepts\n\n### Stock Levels\n- **Minimum Stock**: The lowest quantity of an item you should have\n- **Maximum Stock**: The highest quantity you should maintain\n- **Reorder Point**: When to place new orders\n\n### Inventory Methods\n- **FIFO**: First In, First Out\n- **LIFO**: Last In, First Out\n- **Weighted Average**: Average cost method\n\n## Best Practices\n\n1. Regular audits and cycle counting\n2. Automated reorder points\n3. Supplier relationship management\n4. Demand forecasting',NULL,'How-To Guides',X'5B22696E76656E746F7279222C20226D616E6167656D656E74222C20227475746F7269616C225D',1,0,'2024-02-15 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','50523974-c287-4158-8b11-cd0fe228b802','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Welcome to Our ERP System','welcome-to-erp','Discover the power of our comprehensive ERP solution for modern businesses.','# Welcome to Our ERP System\n\nWe\'re excited to introduce you to our comprehensive Enterprise Resource Planning (ERP) system. Our platform brings together all aspects of your business operations into one unified solution.\n\n## Key Features\n\n- **Inventory Management**: Track stock levels, manage suppliers, and optimize your supply chain\n- **Sales & CRM**: Manage customer relationships and track sales performance\n- **Financial Management**: Handle invoicing, expenses, and financial reporting\n- **Project Management**: Plan, execute, and monitor projects effectively\n- **Human Resources**: Manage employee data and organizational structure\n\n## Getting Started\n\nOur system is designed to be intuitive and user-friendly. Whether you\'re a small business or a large enterprise, our ERP solution scales with your needs.',NULL,'Product Updates',X'5B22616E6E6F756E63656D656E74222C20226665617475726573222C202277656C636F6D65225D',1,1,'2024-01-15 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','52c1fef4-c588-458f-8f21-a85eb21bd317','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Sales Pipeline Optimization','sales-pipeline-optimization','Learn strategies to optimize your sales pipeline and increase conversion rates.','# Sales Pipeline Optimization\n\nA well-optimized sales pipeline is essential for consistent revenue growth. Here\'s how to improve your sales process:\n\n## Pipeline Stages\n\n1. **Lead Generation**: Attract potential customers\n2. **Lead Qualification**: Identify serious prospects\n3. **Proposal**: Present your solution\n4. **Negotiation**: Handle objections and pricing\n5. **Closing**: Finalize the deal\n6. **Follow-up**: Ensure customer satisfaction\n\n## Optimization Strategies\n\n### Data-Driven Decisions\nUse analytics to identify bottlenecks and improvement opportunities.\n\n### Process Standardization\nCreate consistent procedures for each pipeline stage.\n\n### Technology Integration\nLeverage CRM tools to automate and streamline processes.',NULL,'Sales & Marketing',X'5B2273616C6573222C2022706970656C696E65222C20226F7074696D697A6174696F6E225D',1,0,'2024-03-01 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','55d3099a-40e7-41eb-aae9-822db98f218b','2025-07-09 09:02:29','2025-07-09 09:02:29'),('5 Ways ERP Can Transform Your Business','5-ways-erp-transforms-business','Learn how implementing an ERP system can revolutionize your business operations and drive growth.','# 5 Ways ERP Can Transform Your Business\n\nImplementing an Enterprise Resource Planning (ERP) system can be a game-changer for businesses of all sizes. Here are five key ways ERP can transform your operations:\n\n## 1. Streamlined Operations\n\nERP systems integrate all business processes, eliminating data silos and reducing manual work.\n\n## 2. Real-time Visibility\n\nGet instant access to critical business data and make informed decisions quickly.\n\n## 3. Improved Efficiency\n\nAutomate routine tasks and workflows to boost productivity across your organization.\n\n## 4. Better Customer Service\n\nAccess complete customer information to provide superior service and support.\n\n## 5. Scalable Growth\n\nERP systems grow with your business, supporting expansion without major system overhauls.',NULL,'Business Insights',X'5B227472616E73666F726D6174696F6E222C2022656666696369656E6379222C202267726F777468225D',1,1,'2024-02-01 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','5e3f1921-3aaf-40f9-9a34-f369e65a370b','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Cloud vs On-Premise ERP','cloud-vs-onpremise-erp','Compare cloud and on-premise ERP deployments to make the right choice for your business.','# Cloud vs On-Premise ERP\n\nChoosing between cloud and on-premise ERP deployment is a critical decision. Here\'s a comprehensive comparison:\n\n## Cloud ERP Advantages\n\n### Lower Upfront Costs\nNo need for extensive hardware investments.\n\n### Scalability\nEasily scale resources up or down based on needs.\n\n### Automatic Updates\nVendor handles system updates and maintenance.\n\n### Remote Access\nAccess from anywhere with internet connection.\n\n## On-Premise ERP Advantages\n\n### Complete Control\nFull control over system and data.\n\n### Customization\nExtensive customization possibilities.\n\n### Security\nDirect control over security measures.\n\n### Compliance\nEasier to meet specific regulatory requirements.\n\n## Making the Decision\n\nConsider factors like:\n- Budget and cash flow\n- IT resources and expertise\n- Security requirements\n- Compliance needs\n- Growth plans',NULL,'Technology',X'5B22636C6F7564222C20226465706C6F796D656E74222C2022636F6D70617269736F6E225D',1,0,'2024-05-01 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','617efeb5-bf68-4c41-a71c-de796003f4bf','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Data Security in ERP Systems','data-security-erp-systems','Essential security measures to protect your business data in ERP environments.','# Data Security in ERP Systems\n\nProtecting sensitive business data is paramount in today\'s digital landscape. Here\'s how to secure your ERP system:\n\n## Security Fundamentals\n\n### Access Control\n- Role-based permissions\n- Multi-factor authentication\n- Regular access reviews\n\n### Data Encryption\n- Encryption at rest\n- Encryption in transit\n- Key management\n\n### Network Security\n- Firewalls and intrusion detection\n- VPN for remote access\n- Regular security updates\n\n## Compliance Considerations\n\n### GDPR\nEnsure proper handling of personal data for EU citizens.\n\n### SOX\nMaintain financial data integrity and audit trails.\n\n### Industry Standards\nFollow sector-specific security requirements.\n\n## Best Practices\n\n1. Regular security audits\n2. Employee training\n3. Incident response planning\n4. Backup and disaster recovery',NULL,'Security',X'5B227365637572697479222C2022636F6D706C69616E6365222C2022646174612070726F74656374696F6E225D',1,1,'2024-04-15 00:00:00','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','d21551c9-c9fc-4315-beb7-7a7361536a3f','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `finance_expenses` VALUES ('0bf669b6-070f-447f-9aef-6a5259bcb5d7','EXP-2025-104','Software',800.91,'Vendor E','2025-07-01 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('4dd5fe47-ff09-4162-b30e-08d734886f19','EXP-2025-102','Utilities',500.32,'Vendor C','2025-07-05 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('54c7b072-313e-445b-a487-e286389632a5','EXP-2025-101','Office Supplies',350.08,'Vendor B','2025-07-07 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('580acf23-b0c0-40a0-b649-06497d7a1d32','EXP-2025-103','Rent',650.41,'Vendor D','2025-07-03 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('91564fe9-e717-4c59-866a-efd8b2ab99e4','EXP-2025-100','Travel',200.31,'Vendor A','2025-07-09 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('9e8be890-1f95-4d9c-9594-eb45821d92b8','EXP-2025-105','Hardware',950.41,'Vendor F','2025-06-29 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('bf03bc90-2716-45ad-8e11-bcc65f0dc208','EXP-2025-107','Consulting',1250.11,'Vendor H','2025-06-25 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('cbf734b2-9b1d-4bd5-990b-d54ccb0e18bf','EXP-2025-109','Training',1550.56,'Vendor J','2025-06-21 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('ec66f292-6ed7-46f7-86db-68fb15864fc2','EXP-2025-106','Marketing',1100.46,'Vendor G','2025-06-27 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('f1c2583d-9155-4c36-ba99-711407517449','EXP-2025-108','Maintenance',1400.99,'Vendor I','2025-06-23 16:02:29','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9');

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

INSERT INTO `finance_invoices` VALUES ('1cd071e9-1ed0-4fec-ab1a-c92a7a83b95c','INV-2025-100','Lisa Garcia',500.2,'draft','2025-07-09 16:02:29','2025-08-08 16:02:29','Payment due in 30 days. Thank you for your business!','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('2e92a429-0a84-485f-8ac5-eba5ede2a55e','INV-2025-102','Jane Doe',1100.17,'paid','2025-06-29 16:02:29','2025-08-02 16:02:29','Payment due in 30 days. Thank you for your business!','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('36803ad3-e3a2-4679-ac7f-8ce55b2c11f0','INV-2025-107','David Brown',2600.51,'overdue','2025-06-04 16:02:29','2025-07-18 16:02:29',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('5061f789-49de-4ad5-be6c-4ff47485e22b','INV-2025-109','John Smith',3200.27,'sent','2025-05-25 16:02:29','2025-07-12 16:02:29',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('7b0beadb-721d-4c48-b913-fc6011341b62','INV-2025-108','Amy Davis',2900.34,'draft','2025-05-30 16:02:29','2025-07-15 16:02:29','Payment due in 30 days. Thank you for your business!','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('aac9d0aa-c67c-4376-a916-628d49adcb31','INV-2025-105','Tom Miller',2000.36,'sent','2025-06-14 16:02:29','2025-07-24 16:02:29',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('b213e53a-d412-4a2c-a4d7-455b965e1347','INV-2025-101','Emma Taylor',800.09,'sent','2025-07-04 16:02:29','2025-08-05 16:02:29',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('bcf7bed9-3ea5-4b66-9634-8e298f0ac6ea','INV-2025-106','Chris Anderson',2300.49,'paid','2025-06-09 16:02:29','2025-07-21 16:02:29','Payment due in 30 days. Thank you for your business!','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('c225dd29-24b2-434e-89e3-52256ed79489','INV-2025-103','Mike Johnson',1400.6,'overdue','2025-06-24 16:02:29','2025-07-30 16:02:29',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('d5a6776d-7cf3-40b2-a2c9-af54ea13828c','INV-2025-104','Sarah Wilson',1700.47,'draft','2025-06-19 16:02:29','2025-07-27 16:02:29','Payment due in 30 days. Thank you for your business!','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9');

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

INSERT INTO `profiles` VALUES ('admin@erpnew.com','Taufik','Rahman',NULL,'ok','System Administrator','081211277766',NULL,NULL,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2025-07-09 09:02:28','2025-07-09 11:43:58'),('user2@erpnew.com','Jane','Doe',NULL,NULL,'Developer',NULL,NULL,NULL,0,'952659a4-0600-4b78-a6dd-606af1e2904e','2025-07-09 09:02:29','2025-07-09 09:02:29'),('user1@erpnew.com','John','Smith',NULL,NULL,'Manager',NULL,NULL,NULL,0,'d413dbda-147b-49e3-9612-8288f444a429','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `inventory_items` VALUES ('Webcam HD','Electronics',15,80.00,'Logitech','in stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','0bc0ade7-e9bd-45b5-845f-6bf677ff4a93','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Printer HP LaserJet','Electronics',12,450.00,'HP Inc','in stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','14918af2-e464-4e41-8798-c243c858d111','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Desk Standing','Furniture',8,800.00,'IKEA','in stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2668e35a-3008-458c-b5c2-0675f7345666','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Headset Noise Cancelling','Accessories',20,250.00,'Sony','in stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','6a4e1c85-a27a-40ee-905b-86134ce72073','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Laptop Dell XPS 13','Electronics',25,1200.00,'Dell Inc','in stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','76f17d4b-ed57-4c55-9f99-e0faad7db539','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Monitor 27 inch 4K','Electronics',0,600.00,'Samsung','out of stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','7c2fe6f6-e391-4465-a22e-075365ee7ad8','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Wireless Mouse','Accessories',50,45.00,'Logitech','in stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','a482ed3b-055f-406c-91b3-0bf800e1acdd','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Conference Table','Furniture',2,1500.00,'Herman Miller','low stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f99cfa4e-f1e0-494c-8972-9cd2227de318','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Mechanical Keyboard','Accessories',3,120.00,'Corsair','low stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','fb4adfc5-caa0-4b08-b10c-b195651ab4c8','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Office Chair Ergonomic','Furniture',5,350.00,'Office Depot','low stock','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','fb8923f6-c828-48f3-a367-d1c8b0ae8965','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `faqs` VALUES ('Is my data secure?','Absolutely. We implement industry-standard security measures including data encryption, secure authentication, regular backups, and access controls. Your data is protected both in transit and at rest.','Security',1,5,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','05ae5a91-b0c4-43f6-abaf-3e47a3e4aba7','2025-07-09 09:02:29','2025-07-09 09:02:29'),('How do I get started with the system?','To get started, simply log in with your provided credentials, complete your profile setup, and familiarize yourself with the dashboard. We recommend starting with the Getting Started guide in our documentation section.','Getting Started',1,2,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1900bcf0-7a91-44d2-9c64-c5d87979c18f','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Can I access the system from mobile devices?','Yes, our ERP system is fully responsive and works on tablets and smartphones. You can access all major functions from any device with an internet connection and a modern web browser.','Technical',1,6,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','203e22e0-9696-4791-8919-e4460ab7d6f0','2025-07-09 09:02:29','2025-07-09 09:02:29'),('How do I add new users to the system?','Admin users can add new users through the User Management section. Simply click \'Add New User\', enter their details, assign appropriate roles and permissions, and send them an invitation email.','User Management',1,9,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','6094b72a-841b-4d5e-9e3b-4afd2af93f81','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Can I customize the dashboard?','Yes! Our dashboard is fully customizable. You can add, remove, and rearrange widgets to show the information most relevant to your role and responsibilities. Access the customization options from the dashboard settings menu.','Dashboard',1,3,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','7ea4f8bc-a06f-4165-bbce-84bc55be98f2','2025-07-09 09:02:29','2025-07-09 09:02:29'),('How do I generate reports?','Go to the Reports section where you\'ll find various pre-built reports for sales, inventory, finance, and more. You can also create custom reports using our report builder tool. Reports can be exported to PDF or Excel formats.','Reports',1,7,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','913461a7-da8c-4ea2-b6e7-86332c5ba140','2025-07-09 09:02:29','2025-07-09 09:02:29'),('What support options are available?','We offer multiple support channels including email support, live chat, comprehensive documentation, video tutorials, and community forums. Premium plans include phone support and dedicated account managers.','Support',1,10,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','d5b03d64-ff2f-4b9b-9759-89017d19952e','2025-07-09 09:02:29','2025-07-09 09:02:29'),('What payment methods do you accept?','We accept all major credit cards, bank transfers, and digital payment methods. Payment processing is handled securely through our certified payment partners. Contact our billing team for enterprise payment options.','Billing',1,8,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','e22ebfd1-d276-426f-974b-d56d266ad4e1','2025-07-09 09:02:29','2025-07-09 09:02:29'),('What is an ERP system?','An Enterprise Resource Planning (ERP) system is a comprehensive business management software that integrates various business processes and functions into a single, unified system. It helps organizations manage their operations more efficiently by providing real-time visibility into all aspects of the business.','General',1,1,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f36ec544-1b07-4cc2-ad39-d392e52e6ca3','2025-07-09 09:02:29','2025-07-09 09:02:29'),('How do I manage inventory items?','Navigate to the Inventory section to add, edit, and track your inventory items. You can set reorder points, track stock levels, and generate reports. The system will automatically alert you when items are running low.','Inventory',1,4,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f4372774-5ba1-49a3-bd39-bf939465de72','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `employees` VALUES ('EMP005','Michael Brown','michael.b@company.com',NULL,'Finance','Financial Analyst',70000.00,'2023-05-20','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','0311b97e-554e-4b79-ba02-9fe1f5db5a84','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP003','James Wilson','james.w@company.com',NULL,'HR','HR Specialist',65000.00,'2023-03-10','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','29230ffc-02fc-4ddd-857f-ae0bf18ccf6e','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP004','Jennifer Lee','jennifer.l@company.com',NULL,'Marketing','Marketing Coordinator',55000.00,'2023-04-05','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2a4ca2c1-8536-46f0-96e2-ca1d2522efbb','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP006','Lisa Zhang','lisa.z@company.com',NULL,'Engineering','DevOps Engineer',80000.00,'2023-06-01','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','445374d9-f0a7-467a-80ed-a15cfe40101c','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP009','Kevin Davis','kevin.d@company.com',NULL,'IT','System Administrator',72000.00,'2023-09-10','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','4496cd71-cade-42ad-9aac-d7c910e4e46e','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP007','Daniel Kim','daniel.k@company.com',NULL,'Sales','Sales Representative',60000.00,'2023-07-15','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','6288a12b-9b6a-4da1-9e37-6debd8785092','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP001','Robert Johnson','robert.j@company.com',NULL,'Engineering','Software Engineer',75000.00,'2023-01-15','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','6afb849f-0f30-4ba6-b25b-fdc06ddab744','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP002','Maria Rodriguez','maria.r@company.com',NULL,'Sales','Sales Manager',85000.00,'2023-02-01','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','9e1e5df9-d1db-42e1-a72b-5cebdd7c677b','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP010','Rachel Green','rachel.g@company.com',NULL,'Design','UI/UX Designer',68000.00,'2023-10-05','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','c0d58fb6-3e14-431d-acfb-8f98b4308b34','2025-07-09 09:02:29','2025-07-09 09:02:29'),('EMP008','Amanda Smith','amanda.s@company.com',NULL,'Operations','Operations Manager',90000.00,'2023-08-01','active',NULL,NULL,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','ede2f4e7-4232-4727-ad8c-79b49b5b3650','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `docs` VALUES ('Getting Started Guide','getting-started','# Getting Started\n\nWelcome to our ERP system! This guide will help you get started.\n\n## Initial Setup\n\n1. Log in with your credentials\n2. Configure your profile\n3. Set up your workspace','Getting Started',X'5B227475746F7269616C222C2022626173696373222C20227365747570225D',1,1,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','236f1809-8455-42a6-b790-e39cc4831c07','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Sales Process','sales-process','# Sales Process\n\nUnderstand the complete sales workflow.\n\n## Creating Sales Leads\n\n- Navigate to Sales section\n- Create new lead\n- Track progress','Sales',X'5B2273616C6573222C20226C65616473222C2022776F726B666C6F77225D',1,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','24a38080-b9ab-45a9-bb0b-287be1c52ec6','2025-07-09 09:02:29','2025-07-09 09:02:29'),('User Management','user-management','# User Management\n\nLearn how to manage users in the system.\n\n## Adding Users\n\n- Navigate to User Management\n- Click Add New User\n- Fill in the required information','Administration',X'5B227573657273222C202261646D696E222C20226D616E6167656D656E74225D',1,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','39c14393-9c54-47ce-b8e5-64cdf010f6f7','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Troubleshooting Guide','troubleshooting','# Troubleshooting Guide\n\nCommon issues and their solutions.\n\n## Login Issues\n\n- Check credentials\n- Clear browser cache\n- Contact support','Support',X'5B2274726F75626C6573686F6F74696E67222C2022737570706F7274222C202268656C70225D',1,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','58d9a068-0078-46ad-8994-ea0c7a4c55e3','2025-07-09 09:02:29','2025-07-09 09:02:29'),('System Configuration','system-configuration','# System Configuration\n\nConfigure system settings for optimal performance.\n\n## General Settings\n\n- Company information\n- Currency settings\n- Time zones','Administration',X'5B22636F6E66696775726174696F6E222C202273657474696E6773222C202261646D696E225D',1,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','744a1f1d-dc6e-41a0-8fa2-9d511fff4ddc','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Project Management','project-management','# Project Management\n\nManage projects from start to finish.\n\n## Creating Projects\n\n1. Access Projects module\n2. Define project scope\n3. Assign team members','Projects',X'5B2270726F6A65637473222C20226D616E6167656D656E74222C2022706C616E6E696E67225D',1,1,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','83924b58-0cde-45f2-860f-89fb44e9d7a5','2025-07-09 09:02:29','2025-07-09 09:02:29'),('API Documentation','api-documentation','# API Documentation\n\nLearn how to use our REST API.\n\n## Authentication\n\nUse JWT tokens for API access.\n\n## Endpoints\n\n- GET /api/v1/users\n- POST /api/v1/users','Developers',X'5B22617069222C2022646576656C6F706D656E74222C2022696E746567726174696F6E225D',1,1,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','8a4e48ed-10f7-404a-b78c-e2acbbb27b39','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Inventory Management','inventory-management','# Inventory Management\n\nManage your inventory efficiently.\n\n## Adding Items\n\n1. Go to Inventory section\n2. Click Add New Item\n3. Enter item details','Inventory',X'5B22696E76656E746F7279222C20226974656D73222C202273746F636B225D',1,1,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','93380090-2663-4c8c-80bc-b94af4629962','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Financial Reports','financial-reports','# Financial Reports\n\nGenerate comprehensive financial reports.\n\n## Types of Reports\n\n- Revenue reports\n- Expense tracking\n- Profit analysis','Finance',X'5B2266696E616E6365222C20227265706F727473222C2022616E616C7974696373225D',1,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','d2d7a10d-599f-4e5f-8fdc-5dec46e99a32','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Best Practices','best-practices','# Best Practices\n\nRecommended practices for system usage.\n\n## Data Entry\n\n- Use consistent formats\n- Validate before saving\n- Regular backups','Getting Started',X'5B22626573742D707261637469636573222C202267756964656C696E6573222C202274697073225D',1,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f1fc16e4-8ade-4fbd-b6de-8cbf8f1f7bed','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `customers` VALUES ('Lisa Garcia','lisa.garcia@example.com','555-0106','Garcia Solutions','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','207365eb-00a2-46b0-8908-faea75ecd628','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Emma Taylor','emma.taylor@example.com','555-0110','Taylor Systems','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2dabb443-9f94-4f03-a89d-bcced55264da','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Jane Doe','jane.doe@example.com','555-0102','Doe Enterprises','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','4f3d158e-1680-403a-aa2b-a21ba2505221','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Mike Johnson','mike.johnson@example.com','555-0103','Johnson Corp','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','5aa806d9-bc22-4c2c-a33a-df1ad9c00915','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Sarah Wilson','sarah.wilson@example.com','555-0104','Wilson LLC','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','a6e0f8d1-95d9-476d-b5ad-568f75662597','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Tom Miller','tom.miller@example.com','555-0107','Miller Group','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','a7689c6d-c6d1-4d34-bde0-05e1ee9052e4','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Chris Anderson','chris.anderson@example.com','555-0109','Anderson Ltd','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f6b5aa1c-b386-4524-a274-3294cae321e3','2025-07-09 09:02:29','2025-07-09 09:02:29'),('David Brown','david.brown@example.com','555-0105','Brown & Associates','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f8c05c60-532d-4d94-a210-b5a60917af81','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Amy Davis','amy.davis@example.com','555-0108','Davis Tech','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','fb0766d4-c7a6-4814-acd6-287164dc8b3c','2025-07-09 09:02:29','2025-07-09 09:02:29'),('John Smith','john.smith@example.com','555-0101','Smith Industries','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','ff7cbc8c-a0a3-45d0-98c6-56181e060825','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `chat_messages` VALUES ('1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','Great to have you all aboard! Let\'s make this project successful.','1a80e69d-1ee0-4d59-af57-ec9230475637','2025-07-09 12:02:29','2025-07-09 12:02:29'),('1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','halo','3d2ba372-2acd-4527-902c-a4ad61e55eee','2025-07-09 16:23:29','2025-07-09 16:23:29'),('952659a4-0600-4b78-a6dd-606af1e2904e','Hi everyone! Excited to be working with the team.','44a04440-2b27-4fd6-bf13-466fb5e41160','2025-07-09 14:02:29','2025-07-09 14:02:29'),('d413dbda-147b-49e3-9612-8288f444a429','Looking forward to our project collaboration!','659f5461-d6d7-444f-8ef8-8c88cfd69f5f','2025-07-09 13:02:29','2025-07-09 13:02:29'),('1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','Feel free to ask questions and collaborate here.','82633a46-b675-4d20-87f1-c82510aeeaed','2025-07-09 15:02:29','2025-07-09 15:02:29'),('1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','Welcome to the team chat! 🎉','de3fa63a-0ebf-4bfe-a1bb-b3ccd20f9410','2025-07-09 16:02:29','2025-07-09 16:02:29'),('d413dbda-147b-49e3-9612-8288f444a429','Iya ada apa','efa1ff75-bc0b-4944-a5e1-22084ac0a532','2025-07-09 16:26:07','2025-07-09 16:26:07');

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

INSERT INTO `projects` VALUES ('Website Redesign','Complete overhaul of company website','active','2024-01-01','2024-06-30',50000.00,65,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','12ed29ee-1772-4a19-8af0-472496726848','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Data Migration','Migrate data to cloud infrastructure','completed','2023-10-01','2024-01-31',75000.00,100,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','24bd756a-c54d-4c02-b9eb-7859ec02be51','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Training Program','Employee training on new systems','on-hold','2024-05-01','2024-07-31',30000.00,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2b85f2a3-dcd3-46ef-9645-9b4c8f835411','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Database Optimization','Optimize database performance','completed','2024-01-01','2024-03-31',20000.00,100,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','4f2450cb-1022-4b76-adba-beda891d80ed','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Office Renovation','Renovate main office space','active','2024-03-01','2024-07-31',80000.00,30,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','56eceab5-9f03-4e11-9b97-b61a883cea75','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Marketing Campaign','Q2 digital marketing campaign','planning','2024-04-01','2024-06-30',35000.00,20,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','6476a00d-177e-47f4-8c1a-decea0201b28','2025-07-09 09:02:29','2025-07-09 09:02:29'),('API Integration','Third-party API integrations','active','2024-02-15','2024-06-15',40000.00,55,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','771f1335-bb44-4719-ac1b-29c8c91a62f5','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Mobile App Development','Native iOS and Android app','planning','2024-03-01','2024-12-31',150000.00,10,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','8304c589-09f7-45ac-b073-bbc95c973947','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Security Audit','Comprehensive security assessment','active','2024-03-15','2024-05-15',25000.00,80,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','d29c86e0-efb8-4fec-804b-137ad353034a','2025-07-09 09:02:29','2025-07-09 09:02:29'),('ERP System Upgrade','Upgrade legacy ERP system','active','2024-02-01','2024-08-31',200000.00,40,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','d3576567-5889-4a5b-a21f-371afeed27cf','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `sales_leads` VALUES ('Marcus Johnson','marcus.j@prospect.com','','Johnson Enterprises','contacted',18000.00,'Comparing with competitors','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','29a0d509-f599-4797-bc3c-5f04c9bc9ee8','2025-07-09 09:02:29','2025-07-09 09:28:27'),('Sofia Martinez','sofia.m@prospect.com',NULL,'Martinez Ltd','contacted',8500.00,'Scheduled for demo next week','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','3ef31bea-7b0d-4698-8809-3900f73df77b','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Ryan O\'Connor','ryan.o@prospect.com',NULL,'O\'Connor Industries','qualified',25000.00,'Ready to proceed with proposal','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','4d00de20-2e21-4bf4-9db6-a93d49748718','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Lucas Brown','lucas.b@prospect.com',NULL,'Brown Systems','contacted',14000.00,'Interested in custom integration','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','5981ae06-b1b0-4b6f-9008-316850e1cfc4','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Nina Patel','nina.p@prospect.com',NULL,'Patel Solutions','new',12000.00,'Referral from existing customer','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','82d27916-d699-4b0e-a475-746c7f85fd35','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Elena Rodriguez','elena.r@prospect.com',NULL,'Rodriguez Group','lost',5000.00,'Chose competitor solution','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','83f8edea-edfd-4b3c-afe9-6e4e95a0c192','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Alex Thompson','alex.t@prospect.com',NULL,'Thompson Corp','new',15000.00,'Interested in our enterprise solution','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','91bba7b9-185e-4545-9b52-fb2872c7a1e1','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Isabella White','isabella.w@prospect.com',NULL,'White & Associates','new',7500.00,'Small business lead','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','a1ea62f2-7e26-4c26-accc-4a8cbb947704','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Oliver Chen','oliver.c@prospect.com',NULL,'Chen Technologies','qualified',30000.00,'Large enterprise client','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f8875a72-57a3-493b-ab87-93e3646b8b0a','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Maya Singh','maya.s@prospect.com',NULL,'Singh Consulting','qualified',22000.00,'Decision maker identified','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','fbf1a447-4262-47a4-9a70-faeef43f4803','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `suppliers` VALUES ('Electronics Plus','Lisa Electronics','lisa@electronicsplus.com','555-1004','321 Electronics Way, Electronic City, EC 24680','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','0c7700e7-b992-4f1e-b07f-5f07070ff55d','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Cloud Services','Chris Cloud','chris@cloudservices.com','555-1009','369 Cloud Road, Cloud Town, CT 53197','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','21c10079-2903-4594-b69e-0a54bfbeb808','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Furniture World','Mike Furniture','mike@furnitureworld.com','555-1003','789 Furniture Blvd, Furniture City, FC 13579','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','22835dc3-e83b-4ead-aef8-37eaf76b6750','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Tech Solutions Inc','John Manager','john@techsolutions.com','555-1001','123 Tech Street, Tech City, TC 12345','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2ff5b5d9-9acd-4ec4-8b1b-20d4b72de2b2','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Security Solutions','Rachel Security','rachel@securitysolutions.com','555-1010','741 Security Blvd, Security City, SC 42086','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','33d36113-cf3b-4b82-92e4-7a28039707a0','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Software Solutions','Amy Software','amy@softwaresolutions.com','555-1006','987 Software Lane, Software City, SC 86420','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','5d5cfbd6-3cbf-493a-bb76-d8c86f9dbc99','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Office Supplies Co','Sarah Sales','sarah@officesupplies.com','555-1002','456 Supply Ave, Supply Town, ST 67890','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','81e2555a-8c13-4dd8-abe7-84a8396eacca','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Network Systems','Emma Network','emma@networksystems.com','555-1008','258 Network Ave, Network City, NC 64208','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','a9a5b922-dab9-4d23-9f08-e07a718e9001','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Hardware Store','Tom Hardware','tom@hardwarestore.com','555-1007','147 Hardware St, Hardware Town, HT 75319','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','cb02425a-c6cd-4432-8065-739e8f3a97fc','2025-07-09 09:02:29','2025-07-09 09:02:29'),('Industrial Equipment LLC','David Industrial','david@industrial.com','555-1005','654 Industrial Park, Industrial Town, IT 97531','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f608ff75-c264-487d-ac90-8eb6708d92e6','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `purchase_orders` VALUES ('PO-2025-009','cb02425a-c6cd-4432-8065-739e8f3a97fc','delivered',1500.00,'2025-02-15','2025-03-01','Partial delivery accepted','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','149f1d0b-fb1b-491c-ab27-74d4bf52961b','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-003','22835dc3-e83b-4ead-aef8-37eaf76b6750','delivered',3200.00,'2025-01-15','2025-02-01','Delivered on time','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','1588ceb0-b9ea-4113-8e88-4cf9363f8ece','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-004','2ff5b5d9-9acd-4ec4-8b1b-20d4b72de2b2','pending',950.00,'2025-01-20','2025-02-05','Awaiting approval','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2788c91c-6b7d-4537-96e8-b98ff1519bd7','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-010','f608ff75-c264-487d-ac90-8eb6708d92e6','pending',5200.00,'2025-02-20','2025-03-05','Large order - special handling','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','27b3de5e-6031-4f88-990a-b157fd37af80','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-005','33d36113-cf3b-4b82-92e4-7a28039707a0','approved',4500.00,'2025-01-25','2025-02-10','Bulk order discount applied','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','28237bcb-8fd7-4a9a-a2a0-0d342519ca84','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-002','21c10079-2903-4594-b69e-0a54bfbeb808','approved',1800.00,'2025-01-10','2025-01-25','Standard delivery','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','84aed90c-6781-4164-bfbc-12184cc69d87','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-008','a9a5b922-dab9-4d23-9f08-e07a718e9001','approved',3600.00,'2025-02-10','2025-02-25','Quality inspection required','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','8847b405-8292-4eb9-8f31-d9fa7b25e36b','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-006','5d5cfbd6-3cbf-493a-bb76-d8c86f9dbc99','delivered',1200.00,'2025-02-01','2025-02-15','Express delivery','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','e4f150fb-050d-48c9-91cc-04374c8b2887','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-007','81e2555a-8c13-4dd8-abe7-84a8396eacca','pending',2800.00,'2025-02-05','2025-02-20','Payment terms: Net 30','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f7cb0abf-e969-4339-8a15-bd13a2bbea66','2025-07-09 09:02:29','2025-07-09 09:02:29'),('PO-2025-001','0c7700e7-b992-4f1e-b07f-5f07070ff55d','pending',2500.00,'2025-01-05','2025-01-20','Urgent delivery required','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','f81c9e67-15ab-4d56-867d-10c730245cb3','2025-07-09 09:02:29','2025-07-09 09:02:29');

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

INSERT INTO `system_settings` VALUES (1,0,0,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','ce653d53-f50b-427a-a44a-ca7086906700','2025-07-09 16:02:29','2025-07-09 16:02:29');

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

INSERT INTO `transactions` VALUES ('09f23029-a10b-471a-b3d5-c45aba95d3b3','transfer',1350.79,'Sample transaction 6','2025-06-24 16:02:29','Marketing',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('0b3d3673-ef90-4c02-888e-08543eea5b46','income',100.97,'Sample transaction 1','2025-07-09 16:02:29','Sales','REF-2025-100','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('25d5d993-3f7e-4f1f-9871-8f8906dfade1','transfer',2100.66,'Sample transaction 9','2025-06-15 16:02:29','Software','REF-2025-108','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('2f7a7c63-841b-4c82-9afc-d21782d89e78','transfer',600.81,'Sample transaction 3','2025-07-03 16:02:29','Rent','REF-2025-102','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('45409da4-7532-4534-986e-4fa715e72cac','expense',1100.23,'Sample transaction 5','2025-06-27 16:02:29','Office Supplies','REF-2025-104','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('4a57d4c7-8892-43e2-9d9f-92586818b6ed','income',2350.57,'Sample transaction 10','2025-06-12 16:02:29','Hardware',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('61d148f3-2496-4173-8a8b-ef3ac8a7807d','income',850.08,'Sample transaction 4','2025-06-30 16:02:29','Utilities',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('76240325-b705-413c-9a9c-b27568215fd3','expense',1850.21,'Sample transaction 8','2025-06-18 16:02:29','Consulting',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('80ff00b8-43c3-43b0-9cc1-5d27647416e5','income',1600.89,'Sample transaction 7','2025-06-21 16:02:29','Travel','REF-2025-106','2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9'),('d66e1bdd-a97e-4ddd-b506-43776d85e3bb','expense',350.39,'Sample transaction 2','2025-07-06 16:02:29','Salary',NULL,'2025-07-09 16:02:29','2025-07-09 16:02:29','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9');

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

INSERT INTO `user_preferences` VALUES ('1af7f264-9a5a-4c89-a7ea-fd826dc32fc9',1,0,1,1,0,0,1,'en','est',0,0,1,0,'Your Company Name','USD','07dffeb9-b05c-48cc-be08-57be77d0b435','2025-07-09 11:42:00','2025-07-09 11:45:14');

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

INSERT INTO `users` VALUES ('admin@erpnew.com','$2b$12$bIa5KcpiptS4jIo5HEiCaef5ytzx5CdaTUbsgNQLroKJrKmqkZuDW',1,1,'1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','2025-07-09 09:02:28','2025-07-09 11:45:50'),('user2@erpnew.com','$2b$12$hHGxZBfuVYHLWd30cjDsietQjBa5M8cQR7k./dklGyHHsPVPp3yK6',1,1,'952659a4-0600-4b78-a6dd-606af1e2904e','2025-07-09 09:02:29','2025-07-09 09:25:15'),('user1@erpnew.com','$2b$12$0X6UUUqfZSYYs2GXCDD9FeLmPyC1dMc7StH0fkYuSHsMqbxem3/xS',1,1,'d413dbda-147b-49e3-9612-8288f444a429','2025-07-09 09:02:29','2025-07-09 09:25:00');

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

INSERT INTO `work_orders` VALUES ('WO-2024-010','Data Migration Script',1,'planning','2024-04-15','2024-06-01','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','38e60f76-c44d-44fe-9e7a-51c1343cec92','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-002','Website Landing Page',3,'in-progress','2024-02-01','2024-03-15','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','3c5323ce-1965-4e2b-aeba-a543938de7f0','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-003','Mobile App Feature',2,'planning','2024-03-01','2024-04-30','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','54375dfd-94af-4df3-852e-cc1e5d7bd21a','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-004','Database Report',5,'completed','2024-01-15','2024-02-15','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','66d9faff-b369-424f-9fe4-516858db11b8','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-005','API Integration',1,'in-progress','2024-02-15','2024-04-01','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','7908a537-095e-4138-ad16-804b6a9967d6','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-008','System Backup',1,'in-progress','2024-03-15','2024-04-15','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','8fd8aa73-cf39-40b4-b4c9-480884bd8ad1','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-009','Performance Optimization',1,'completed','2024-02-01','2024-03-01','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','98323c27-3c6d-42a6-ab63-f27ec5b437ab','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-006','Security Patch',1,'completed','2024-03-01','2024-03-15','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','a8bbf5d5-126d-4641-b1eb-84af6ec98895','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-007','User Training Material',10,'planning','2024-04-01','2024-05-31','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','ad84cb7d-ee1c-49d6-8c1b-7501f9712dd4','2025-07-09 09:02:29','2025-07-09 09:02:29'),('WO-2024-001','Custom Software Module',1,'completed','2024-01-01','2024-02-01','1af7f264-9a5a-4c89-a7ea-fd826dc32fc9','e4c7a15a-1d4f-494d-9e55-a3c2a6f573bf','2025-07-09 09:02:29','2025-07-09 09:02:29');
