# Host: localhost  (Version 8.0.30)
# Date: 2025-07-11 11:32:42
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

INSERT INTO `blogs` VALUES ('Cloud vs On-Premise ERP','cloud-vs-onpremise-erp','Compare cloud and on-premise ERP deployments to make the right choice for your business.','# Cloud vs On-Premise ERP\n\nChoosing between cloud and on-premise ERP deployment is a critical decision. Here\'s a comprehensive comparison:\n\n## Cloud ERP Advantages\n\n### Lower Upfront Costs\nNo need for extensive hardware investments.\n\n### Scalability\nEasily scale resources up or down based on needs.\n\n### Automatic Updates\nVendor handles system updates and maintenance.\n\n### Remote Access\nAccess from anywhere with internet connection.\n\n## On-Premise ERP Advantages\n\n### Complete Control\nFull control over system and data.\n\n### Customization\nExtensive customization possibilities.\n\n### Security\nDirect control over security measures.\n\n### Compliance\nEasier to meet specific regulatory requirements.\n\n## Making the Decision\n\nConsider factors like:\n- Budget and cash flow\n- IT resources and expertise\n- Security requirements\n- Compliance needs\n- Growth plans',NULL,'Technology',X'5B22636C6F7564222C20226465706C6F796D656E74222C2022636F6D70617269736F6E225D',1,0,'2024-05-01 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','781fc04d-8fea-40e6-8cfd-4bf6dd216f73','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Sales Pipeline Optimization','sales-pipeline-optimization','Learn strategies to optimize your sales pipeline and increase conversion rates.','# Sales Pipeline Optimization\n\nA well-optimized sales pipeline is essential for consistent revenue growth. Here\'s how to improve your sales process:\n\n## Pipeline Stages\n\n1. **Lead Generation**: Attract potential customers\n2. **Lead Qualification**: Identify serious prospects\n3. **Proposal**: Present your solution\n4. **Negotiation**: Handle objections and pricing\n5. **Closing**: Finalize the deal\n6. **Follow-up**: Ensure customer satisfaction\n\n## Optimization Strategies\n\n### Data-Driven Decisions\nUse analytics to identify bottlenecks and improvement opportunities.\n\n### Process Standardization\nCreate consistent procedures for each pipeline stage.\n\n### Technology Integration\nLeverage CRM tools to automate and streamline processes.',NULL,'Sales & Marketing',X'5B2273616C6573222C2022706970656C696E65222C20226F7074696D697A6174696F6E225D',1,0,'2024-03-01 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','95756981-1098-4e46-92a9-a14ee86a98d7','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Understanding Inventory Management','understanding-inventory-management','Master the fundamentals of inventory management and optimize your stock levels.','# Understanding Inventory Management\n\nEffective inventory management is crucial for business success. It involves overseeing the flow of goods from manufacturers to warehouses and from these facilities to point of sale.\n\n## Key Concepts\n\n### Stock Levels\n- **Minimum Stock**: The lowest quantity of an item you should have\n- **Maximum Stock**: The highest quantity you should maintain\n- **Reorder Point**: When to place new orders\n\n### Inventory Methods\n- **FIFO**: First In, First Out\n- **LIFO**: Last In, First Out\n- **Weighted Average**: Average cost method\n\n## Best Practices\n\n1. Regular audits and cycle counting\n2. Automated reorder points\n3. Supplier relationship management\n4. Demand forecasting',NULL,'How-To Guides',X'5B22696E76656E746F7279222C20226D616E6167656D656E74222C20227475746F7269616C225D',1,0,'2024-02-15 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ad4944e8-9d88-49a3-99e7-df6890506833','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Data Security in ERP Systems','data-security-erp-systems','Essential security measures to protect your business data in ERP environments.','# Data Security in ERP Systems\n\nProtecting sensitive business data is paramount in today\'s digital landscape. Here\'s how to secure your ERP system:\n\n## Security Fundamentals\n\n### Access Control\n- Role-based permissions\n- Multi-factor authentication\n- Regular access reviews\n\n### Data Encryption\n- Encryption at rest\n- Encryption in transit\n- Key management\n\n### Network Security\n- Firewalls and intrusion detection\n- VPN for remote access\n- Regular security updates\n\n## Compliance Considerations\n\n### GDPR\nEnsure proper handling of personal data for EU citizens.\n\n### SOX\nMaintain financial data integrity and audit trails.\n\n### Industry Standards\nFollow sector-specific security requirements.\n\n## Best Practices\n\n1. Regular security audits\n2. Employee training\n3. Incident response planning\n4. Backup and disaster recovery',NULL,'Security',X'5B227365637572697479222C2022636F6D706C69616E6365222C2022646174612070726F74656374696F6E225D',1,1,'2024-04-15 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','c598d5a5-ed36-418d-b3ec-0199632f5e9f','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Project Management Methodologies','project-management-methodologies','Explore different project management approaches and find the right fit for your organization.','# Project Management Methodologies\n\nChoosing the right project management methodology can significantly impact project success. Here are the most popular approaches:\n\n## Waterfall\n\nA traditional, linear approach where each phase must be completed before the next begins.\n\n**Best for**: Well-defined projects with stable requirements\n\n## Agile\n\nAn iterative approach that emphasizes flexibility and customer collaboration.\n\n**Best for**: Projects with changing requirements and need for rapid delivery\n\n## Scrum\n\nA specific Agile framework using sprints and defined roles.\n\n**Best for**: Software development and complex product development\n\n## Kanban\n\nA visual workflow management method that limits work in progress.\n\n**Best for**: Continuous workflow and process improvement\n\n## Hybrid Approaches\n\nMany organizations combine elements from different methodologies to create a custom approach.',NULL,'Project Management',X'5B226D6574686F646F6C6F6779222C20226167696C65222C2022776174657266616C6C225D',1,0,'2024-04-01 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','cba69393-199d-4301-bc7b-fbf03b6aa910','2025-07-11 02:24:03','2025-07-11 02:24:03'),('ERP ROI: Measuring Success','erp-roi-measuring-success','Learn how to measure and maximize return on investment from your ERP implementation.','# ERP ROI: Measuring Success\n\nMeasuring return on investment (ROI) is crucial for justifying ERP expenses and optimizing system value.\n\n## ROI Calculation\n\n### Formula\nROI = (Benefits - Costs) / Costs × 100\n\n### Timeframe\nTypically measured over 3-5 years post-implementation.\n\n## Quantifiable Benefits\n\n### Cost Savings\n- Reduced labor costs through automation\n- Lower inventory carrying costs\n- Decreased IT maintenance expenses\n\n### Revenue Increases\n- Improved customer satisfaction\n- Faster order processing\n- Better inventory availability\n\n### Efficiency Gains\n- Reduced processing time\n- Eliminated duplicate data entry\n- Streamlined workflows\n\n## Intangible Benefits\n\n### Improved Decision Making\nBetter data leads to smarter business decisions.\n\n### Enhanced Compliance\nReduced risk of regulatory violations.\n\n### Competitive Advantage\nImproved agility and responsiveness.\n\n## Measuring Success\n\n1. Establish baseline metrics before implementation\n2. Track key performance indicators (KPIs)\n3. Regular reviews and assessments\n4. Continuous optimization',NULL,'Business Insights',X'5B22726F69222C20226D657472696373222C202273756363657373225D',1,1,'2024-06-01 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','e22e28bb-37f5-486b-a71e-4fefa1f9a97e','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Mobile ERP: Business on the Go','mobile-erp-business-on-go','Discover how mobile ERP solutions enable productivity and decision-making anywhere.','# Mobile ERP: Business on the Go\n\nMobile ERP solutions are transforming how businesses operate, enabling real-time access to critical information from anywhere.\n\n## Mobile Capabilities\n\n### Real-time Data Access\nAccess dashboards, reports, and key metrics on mobile devices.\n\n### Workflow Approvals\nApprove purchase orders, expense reports, and other documents remotely.\n\n### Field Operations\nUpdate inventory, record transactions, and manage projects from the field.\n\n### Customer Interactions\nAccess customer information during meetings and site visits.\n\n## Benefits\n\n### Increased Productivity\nEmployees can work efficiently regardless of location.\n\n### Faster Decision Making\nReal-time data enables quick, informed decisions.\n\n### Improved Customer Service\nInstant access to customer data improves service quality.\n\n### Cost Reduction\nReduce travel and office overhead costs.\n\n## Implementation Considerations\n\n1. Security protocols for mobile access\n2. User interface optimization for mobile devices\n3. Offline capability requirements\n4. Device management policies',NULL,'Technology',X'5B226D6F62696C65222C202270726F647563746976697479222C202272656D6F746520776F726B225D',1,0,'2024-05-15 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','e6a29740-29e2-48ed-bbcd-810fef5603fa','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Welcome to Our ERP System','welcome-to-erp','Discover the power of our comprehensive ERP solution for modern businesses.','# Welcome to Our ERP System\n\nWe\'re excited to introduce you to our comprehensive Enterprise Resource Planning (ERP) system. Our platform brings together all aspects of your business operations into one unified solution.\n\n## Key Features\n\n- **Inventory Management**: Track stock levels, manage suppliers, and optimize your supply chain\n- **Sales & CRM**: Manage customer relationships and track sales performance\n- **Financial Management**: Handle invoicing, expenses, and financial reporting\n- **Project Management**: Plan, execute, and monitor projects effectively\n- **Human Resources**: Manage employee data and organizational structure\n\n## Getting Started\n\nOur system is designed to be intuitive and user-friendly. Whether you\'re a small business or a large enterprise, our ERP solution scales with your needs.',NULL,'Product Updates',X'5B22616E6E6F756E63656D656E74222C20226665617475726573222C202277656C636F6D65225D',1,1,'2024-01-15 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ecbffce0-3b55-4a1c-a291-3af9c12abc9a','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Financial Reporting Best Practices','financial-reporting-best-practices','Essential practices for accurate and timely financial reporting in your organization.','# Financial Reporting Best Practices\n\nAccurate financial reporting is critical for business decision-making and compliance. Follow these best practices:\n\n## Key Principles\n\n### Accuracy\nEnsure all financial data is correct and verifiable.\n\n### Timeliness\nProduce reports promptly to support decision-making.\n\n### Consistency\nUse standardized methods and formats across all reports.\n\n### Transparency\nProvide clear explanations and supporting documentation.\n\n## Essential Reports\n\n1. **Income Statement**: Revenue and expenses\n2. **Balance Sheet**: Assets, liabilities, and equity\n3. **Cash Flow Statement**: Cash inflows and outflows\n4. **Budget vs. Actual**: Performance against budget\n\n## Automation Benefits\n\nModern ERP systems automate much of the reporting process, reducing errors and saving time.',NULL,'Finance',X'5B227265706F7274696E67222C202266696E616E6365222C2022636F6D706C69616E6365225D',1,1,'2024-03-15 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','eec01088-8bf5-4b21-80f7-b8f8b568e36e','2025-07-11 02:24:03','2025-07-11 02:24:03'),('5 Ways ERP Can Transform Your Business','5-ways-erp-transforms-business','Learn how implementing an ERP system can revolutionize your business operations and drive growth.','# 5 Ways ERP Can Transform Your Business\n\nImplementing an Enterprise Resource Planning (ERP) system can be a game-changer for businesses of all sizes. Here are five key ways ERP can transform your operations:\n\n## 1. Streamlined Operations\n\nERP systems integrate all business processes, eliminating data silos and reducing manual work.\n\n## 2. Real-time Visibility\n\nGet instant access to critical business data and make informed decisions quickly.\n\n## 3. Improved Efficiency\n\nAutomate routine tasks and workflows to boost productivity across your organization.\n\n## 4. Better Customer Service\n\nAccess complete customer information to provide superior service and support.\n\n## 5. Scalable Growth\n\nERP systems grow with your business, supporting expansion without major system overhauls.',NULL,'Business Insights',X'5B227472616E73666F726D6174696F6E222C2022656666696369656E6379222C202267726F777468225D',1,1,'2024-02-01 00:00:00','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','fee45fb2-a023-4d8c-9abb-ad99ed34464f','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `finance_expenses` VALUES ('2d3ffc7a-ae9d-4d82-8d16-ff3ed31f97f7','EXP-2025-104','Software',800.3,'Vendor E','2025-07-03 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('310e1b27-7f60-4b02-ae29-eaef5028d027','EXP-2025-102','Utilities',500.19,'Vendor C','2025-07-07 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('326b23b1-b9da-4ff5-bafc-5499b34d1eff','EXP-2025-101','Office Supplies',350,'Vendor B','2025-07-09 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('8dedf240-df7d-4407-9a5f-d9a366ba82c7','EXP-2025-107','Consulting',1250.08,'Vendor H','2025-06-27 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('b09145b1-69de-4948-90d7-979809a6a210','EXP-2025-106','Marketing',1100.92,'Vendor G','2025-06-29 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('bc4927dc-1ee9-49d8-b682-783080a2d4a4','EXP-2025-103','Rent',650.22,'Vendor D','2025-07-05 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('bd672ece-3f1f-46cd-b344-abdbd4e8e1a6','EXP-2025-105','Hardware',950.28,'Vendor F','2025-07-01 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('cd9f6e53-3c2c-41d5-b488-b9586f365f28','EXP-2025-100','Travel',200.12,'Vendor A','2025-07-11 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('ce651388-131a-4d57-95cb-3440921da610','EXP-2025-108','Maintenance',1400.92,'Vendor I','2025-06-25 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('fe135de4-d1ff-44f4-8fb5-76c40ffc8781','EXP-2025-109','Training',1550.02,'Vendor J','2025-06-23 09:24:03','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478');

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

INSERT INTO `finance_invoices` VALUES ('46e7233d-3520-4cc5-8562-3e83786ec7c9','INV-2025-102','Amy Davis',1100.46,'pending','2025-06-28 00:00:00','2025-08-01 00:00:00','Payment due in 30 days. Thank you for your business!','2025-07-11 09:24:03','2025-07-11 10:32:48','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('9ad21ce6-ab2a-497e-a17b-c8492b98507b','INV-2025-105','Chris Anderson',2000.15,'sent','2025-06-16 09:24:03','2025-07-26 09:24:03',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('9f6df194-ac3b-404a-a40b-0eb97d3b640b','INV-2025-109','Jane Doe',3200.67,'sent','2025-05-27 09:24:03','2025-07-14 09:24:03',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('a085459a-0bef-4e7a-86f0-aa2fb3df9a84','INV-2025-100','Tom Miller',500.86,'draft','2025-07-11 09:24:03','2025-08-10 09:24:03','Payment due in 30 days. Thank you for your business!','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('a3de838f-50b8-41e7-a911-387306bd7e3d','INV-2025-108','Emma Taylor',2900.63,'draft','2025-06-01 09:24:03','2025-07-17 09:24:03','Payment due in 30 days. Thank you for your business!','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('aaaf8530-f4a4-4999-8ad3-cf7cbd4dbb81','INV-2025-104','David Brown',1700.84,'draft','2025-06-21 09:24:03','2025-07-29 09:24:03','Payment due in 30 days. Thank you for your business!','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('ac74eb9d-27e3-4bc6-9fb8-76030d636b1d','INV-2025-103','John Smith',1400.69,'overdue','2025-06-26 09:24:03','2025-08-01 09:24:03',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('b7d4a48b-80af-4ba6-86b6-3752af220a35','INV-2025-107','Lisa Garcia',2600.26,'overdue','2025-06-06 09:24:03','2025-07-20 09:24:03',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('da4c54a7-c951-406f-bdb2-c87276512db8','INV-2025-106','Mike Johnson',2300.6,'paid','2025-06-11 09:24:03','2025-07-23 09:24:03','Payment due in 30 days. Thank you for your business!','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('fcc541e6-a77d-4c24-a7a6-dd5f1d66812d','INV-2025-101','Sarah Wilson',800.66,'sent','2025-07-06 09:24:03','2025-08-07 09:24:03',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478');

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

INSERT INTO `profiles` VALUES ('user2@erpnew.com','Jane','Doe',NULL,NULL,'Developer',NULL,NULL,NULL,0,'984c5298-0db6-4da0-b3e9-3f6c968c3167','2025-07-11 02:24:03','2025-07-11 02:24:03'),('admin@erpnew.com','Admin','User',NULL,NULL,'System Administrator',NULL,NULL,NULL,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','2025-07-11 02:24:02','2025-07-11 02:24:02'),('user1@erpnew.com','John','Smith',NULL,NULL,'Manager',NULL,NULL,NULL,0,'d862b0a9-c5cc-4454-8d97-2197497e523b','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `inventory_items` VALUES ('Office Chair Ergonomic','Furniture',5,350.00,'Office Depot','low stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','1a6a9e12-2c7f-4720-a97e-dffbfe741cbb','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Headset Noise Cancelling','Accessories',20,250.00,'Sony','in stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','219bb3e7-491c-42e8-866d-288c41b92fa4','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Conference Table','Furniture',2,1500.00,'Herman Miller','low stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','32024200-174f-4037-ad37-89da82cc54ae','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Desk Standing','Furniture',8,800.00,'IKEA','in stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','42a3b920-da08-4c10-af17-985c4e0040a6','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Wireless Mouse','Accessories',50,45.00,'Logitech','in stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','45d50f27-7900-49af-8bc3-4f7337872983','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Laptop Dell XPS 13','Electronics',25,1200.00,'Dell Inc','in stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','53125575-9c9f-4f01-80d3-98d64ccd29f8','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Printer HP LaserJet','Electronics',12,450.00,'HP Inc','in stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','81744801-1f87-4043-a6f0-e11e2f3ce953','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Monitor 27 inch 4K','Electronics',0,600.00,'Samsung','out of stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','a0061931-e356-4adf-b10b-0e23f7ea5d34','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Webcam HD','Electronics',15,80.00,'Logitech','in stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','a6f2ecd0-d4d9-4d83-93ef-c4e8aa5c9ea0','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Mechanical Keyboard','Accessories',3,120.00,'Corsair','low stock','ca5e4074-a4a4-4b5b-a349-96a2fad07478','c2bead17-b9c5-4193-9d59-e58db64f39af','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `faqs` VALUES ('How do I get started with the system?','To get started, simply log in with your provided credentials, complete your profile setup, and familiarize yourself with the dashboard. We recommend starting with the Getting Started guide in our documentation section.','Getting Started',1,2,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','2277864b-7e38-44e1-a913-b2a268dbffb8','2025-07-11 02:24:03','2025-07-11 02:24:03'),('What payment methods do you accept?','We accept all major credit cards, bank transfers, and digital payment methods. Payment processing is handled securely through our certified payment partners. Contact our billing team for enterprise payment options.','Billing',1,8,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','33c726dc-4c46-4e97-88a9-8db8d3c48be0','2025-07-11 02:24:03','2025-07-11 02:24:03'),('What is an ERP system?','An Enterprise Resource Planning (ERP) system is a comprehensive business management software that integrates various business processes and functions into a single, unified system. It helps organizations manage their operations more efficiently by providing real-time visibility into all aspects of the business.','General',1,1,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','4a750669-48c6-4eae-9f43-fec4fcacddd1','2025-07-11 02:24:03','2025-07-11 02:24:03'),('What support options are available?','We offer multiple support channels including email support, live chat, comprehensive documentation, video tutorials, and community forums. Premium plans include phone support and dedicated account managers.','Support',1,10,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','50007085-b9c3-412b-b171-e8406c48c34d','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Is my data secure?','Absolutely. We implement industry-standard security measures including data encryption, secure authentication, regular backups, and access controls. Your data is protected both in transit and at rest.','Security',1,5,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','5fc3648e-69c7-48eb-bd95-9fa25a54236c','2025-07-11 02:24:03','2025-07-11 02:24:03'),('How do I manage inventory items?','Navigate to the Inventory section to add, edit, and track your inventory items. You can set reorder points, track stock levels, and generate reports. The system will automatically alert you when items are running low.','Inventory',1,4,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','a208f1cb-a7cd-4cda-8601-464881703273','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Can I access the system from mobile devices?','Yes, our ERP system is fully responsive and works on tablets and smartphones. You can access all major functions from any device with an internet connection and a modern web browser.','Technical',1,6,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','aa2d663f-f891-41ac-8d2e-e8ff3fc646a1','2025-07-11 02:24:03','2025-07-11 02:24:03'),('How do I add new users to the system?','Admin users can add new users through the User Management section. Simply click \'Add New User\', enter their details, assign appropriate roles and permissions, and send them an invitation email.','User Management',1,9,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','b56e4298-d2b0-4781-9ed9-bdf04dc99f6d','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Can I customize the dashboard?','Yes! Our dashboard is fully customizable. You can add, remove, and rearrange widgets to show the information most relevant to your role and responsibilities. Access the customization options from the dashboard settings menu.','Dashboard',1,3,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','d8c64238-da23-4939-b5dc-c9e04af99b2a','2025-07-11 02:24:03','2025-07-11 02:24:03'),('How do I generate reports?','Go to the Reports section where you\'ll find various pre-built reports for sales, inventory, finance, and more. You can also create custom reports using our report builder tool. Reports can be exported to PDF or Excel formats.','Reports',1,7,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ea4336fa-e629-424b-ac18-8b5d94a9fa55','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `employees` VALUES ('EMP005','Michael Brown','michael.b@company.com',NULL,'Finance','Financial Analyst',70000.00,'2023-05-20','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','1f7ea223-2edb-499c-9f55-d52492ae71fa','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP010','Rachel Green','rachel.g@company.com',NULL,'Design','UI/UX Designer',68000.00,'2023-10-05','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','37831979-a3c8-46c1-a5ad-8c750efc541d','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP008','Amanda Smith','amanda.s@company.com',NULL,'Operations','Operations Manager',90000.00,'2023-08-01','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','4843acf0-96f9-4d14-a535-03c56c2756e3','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP009','Kevin Davis','kevin.d@company.com',NULL,'IT','System Administrator',72000.00,'2023-09-10','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','5598130f-0146-4587-a9b6-cbb28c3153ae','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP001','Robert Johnson','robert.j@company.com',NULL,'Engineering','Software Engineer',75000.00,'2023-01-15','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','6cef7fd8-1336-434e-89bb-8c19e9d5d31f','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP004','Jennifer Lee','jennifer.l@company.com',NULL,'Marketing','Marketing Coordinator',55000.00,'2023-04-05','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','8c3864eb-ea93-47e1-9655-1fb2968f1614','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP006','Lisa Zhang','lisa.z@company.com',NULL,'Engineering','DevOps Engineer',80000.00,'2023-06-01','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','a03268ce-6bd8-419c-98bd-dd87ba227a1e','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP007','Daniel Kim','daniel.k@company.com',NULL,'Sales','Sales Representative',60000.00,'2023-07-15','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','d81e378f-b654-4557-97a5-8dc724924a68','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP002','Maria Rodriguez','maria.r@company.com',NULL,'Sales','Sales Manager',85000.00,'2023-02-01','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','dcd68388-9d94-4304-8fa5-47f4711758ca','2025-07-11 02:24:03','2025-07-11 02:24:03'),('EMP003','James Wilson','james.w@company.com',NULL,'HR','HR Specialist',65000.00,'2023-03-10','active',NULL,NULL,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','e890627b-1dcf-400c-9ad3-bb862eb0c552','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `docs` VALUES ('User Management','user-management','# User Management\n\nLearn how to manage users in the system.\n\n## Adding Users\n\n- Navigate to User Management\n- Click Add New User\n- Fill in the required information','Administration',X'5B227573657273222C202261646D696E222C20226D616E6167656D656E74225D',1,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','05481d99-d8e3-4849-aa4c-f45bd8bbad3e','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Best Practices','best-practices','# Best Practices\n\nRecommended practices for system usage.\n\n## Data Entry\n\n- Use consistent formats\n- Validate before saving\n- Regular backups','Getting Started',X'5B22626573742D707261637469636573222C202267756964656C696E6573222C202274697073225D',1,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','24e4da37-514c-4828-93e4-f0ba8b9cb010','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Troubleshooting Guide','troubleshooting','# Troubleshooting Guide\n\nCommon issues and their solutions.\n\n## Login Issues\n\n- Check credentials\n- Clear browser cache\n- Contact support','Support',X'5B2274726F75626C6573686F6F74696E67222C2022737570706F7274222C202268656C70225D',1,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','33f05215-efb4-4649-91c5-ffc84e1853f5','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Financial Reports','financial-reports','# Financial Reports\n\nGenerate comprehensive financial reports.\n\n## Types of Reports\n\n- Revenue reports\n- Expense tracking\n- Profit analysis','Finance',X'5B2266696E616E6365222C20227265706F727473222C2022616E616C7974696373225D',1,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','3f821d10-ae11-40d6-95af-6aa868429940','2025-07-11 02:24:03','2025-07-11 02:24:03'),('System Configuration','system-configuration','# System Configuration\n\nConfigure system settings for optimal performance.\n\n## General Settings\n\n- Company information\n- Currency settings\n- Time zones','Administration',X'5B22636F6E66696775726174696F6E222C202273657474696E6773222C202261646D696E225D',1,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','4f3c3768-f0be-4ddd-93de-6fa4eb7725cf','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Getting Started Guide','getting-started','# Getting Started\n\nWelcome to our ERP system! This guide will help you get started.\n\n## Initial Setup\n\n1. Log in with your credentials\n2. Configure your profile\n3. Set up your workspace','Getting Started',X'5B227475746F7269616C222C2022626173696373222C20227365747570225D',1,1,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','6c9b8222-c098-4a56-b0be-0a2015249cc9','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Sales Process','sales-process','# Sales Process\n\nUnderstand the complete sales workflow.\n\n## Creating Sales Leads\n\n- Navigate to Sales section\n- Create new lead\n- Track progress','Sales',X'5B2273616C6573222C20226C65616473222C2022776F726B666C6F77225D',1,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','79a20ea7-24c5-40a3-b8d3-a722014317b2','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Inventory Management','inventory-management','# Inventory Management\n\nManage your inventory efficiently.\n\n## Adding Items\n\n1. Go to Inventory section\n2. Click Add New Item\n3. Enter item details','Inventory',X'5B22696E76656E746F7279222C20226974656D73222C202273746F636B225D',1,1,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','a45527be-24bb-424c-b169-430f237cabe6','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Project Management','project-management','# Project Management\n\nManage projects from start to finish.\n\n## Creating Projects\n\n1. Access Projects module\n2. Define project scope\n3. Assign team members','Projects',X'5B2270726F6A65637473222C20226D616E6167656D656E74222C2022706C616E6E696E67225D',1,1,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','b514f090-9bb8-45db-a8b8-401365ec0874','2025-07-11 02:24:03','2025-07-11 02:24:03'),('API Documentation','api-documentation','# API Documentation\n\nLearn how to use our REST API.\n\n## Authentication\n\nUse JWT tokens for API access.\n\n## Endpoints\n\n- GET /api/v1/users\n- POST /api/v1/users','Developers',X'5B22617069222C2022646576656C6F706D656E74222C2022696E746567726174696F6E225D',1,1,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ca5e4074-a4a4-4b5b-a349-96a2fad07478','e4913ddb-3c39-432b-b01d-374dce3327d0','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `customers` VALUES ('Tom Miller','tom.miller@example.com','555-0107','Miller Group','ca5e4074-a4a4-4b5b-a349-96a2fad07478','1e96caa4-e4b6-4c1a-bcda-5b5557b70301','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Sarah Wilson','sarah.wilson@example.com','555-0104','Wilson LLC','ca5e4074-a4a4-4b5b-a349-96a2fad07478','24e20200-fbe6-4961-a0be-a745c36c47d1','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Amy Davis','amy.davis@example.com','555-0108','Davis Tech','ca5e4074-a4a4-4b5b-a349-96a2fad07478','7aa4728a-1d06-4d75-8c2a-5063331fe948','2025-07-11 02:24:03','2025-07-11 02:24:03'),('John Smith','john.smith@example.com','555-0101','Smith Industries','ca5e4074-a4a4-4b5b-a349-96a2fad07478','7f78b825-c29d-47ac-9f99-ab9dc15b181f','2025-07-11 02:24:03','2025-07-11 02:24:03'),('David Brown','david.brown@example.com','555-0105','Brown & Associates','ca5e4074-a4a4-4b5b-a349-96a2fad07478','8ac695e3-3bd4-42df-8cc6-44344f302c9e','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Chris Anderson','chris.anderson@example.com','555-0109','Anderson Ltd','ca5e4074-a4a4-4b5b-a349-96a2fad07478','a270eace-68fb-4610-bbba-df181bbf0073','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Mike Johnson','mike.johnson@example.com','555-0103','Johnson Corp','ca5e4074-a4a4-4b5b-a349-96a2fad07478','b10e1382-bb45-4597-999e-d8ae0e44b523','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Lisa Garcia','lisa.garcia@example.com','555-0106','Garcia Solutions','ca5e4074-a4a4-4b5b-a349-96a2fad07478','bc7ab642-180e-4c85-b95f-eefc9539de0a','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Emma Taylor','emma.taylor@example.com','555-0110','Taylor Systems','ca5e4074-a4a4-4b5b-a349-96a2fad07478','de318ae5-e7c7-4396-b5c3-83058cf9c6ab','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Jane Doe','jane.doe@example.com','555-0102','Doe Enterprises','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ef694efc-6450-4d6d-96f7-17cbefef6eb0','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `chat_messages` VALUES ('ca5e4074-a4a4-4b5b-a349-96a2fad07478','Feel free to ask questions and collaborate here.','3d649c7d-d87d-47ae-8103-004c3aaeb63a','2025-07-11 08:24:03','2025-07-11 08:24:03'),('d862b0a9-c5cc-4454-8d97-2197497e523b','Looking forward to our project collaboration!','5f0b89df-66c4-4c50-9907-73e9936842b2','2025-07-11 06:24:03','2025-07-11 06:24:03'),('ca5e4074-a4a4-4b5b-a349-96a2fad07478','🌚 oi','cb30373a-1d18-437d-80b1-514cd3860b08','2025-07-11 10:09:49','2025-07-11 10:09:49'),('ca5e4074-a4a4-4b5b-a349-96a2fad07478','Welcome to the team chat! 🎉','ccd46ca3-72cf-4da3-8ea9-23d2e77acaa7','2025-07-11 09:24:03','2025-07-11 09:24:03'),('ca5e4074-a4a4-4b5b-a349-96a2fad07478','Hi everyone! Excited to be working with the team.','d68dd4ca-b1bc-40a8-bbf0-a8b2713547f7','2025-07-11 07:24:03','2025-07-11 07:24:03'),('ca5e4074-a4a4-4b5b-a349-96a2fad07478','Great to have you all aboard! Let\'s make this project successful.','db6d541d-de62-4ec8-8805-eaf59144310c','2025-07-11 05:24:03','2025-07-11 05:24:03');

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

INSERT INTO `projects` VALUES ('Website Redesign','Complete overhaul of company website','active','2024-01-01','2024-06-30',50000.00,65,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','0d01fafb-9b4d-44cf-83ff-4069c6ccb35d','2025-07-11 02:24:03','2025-07-11 02:24:03'),('API Integration','Third-party API integrations','active','2024-02-15','2024-06-15',40000.00,55,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','14a2a6e9-3448-4cc8-9201-837d9258533d','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Marketing Campaign','Q2 digital marketing campaign','planning','2024-04-01','2024-06-30',35000.00,20,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','3c964798-5c4e-45b5-b7b0-2946cdb34f47','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Mobile App Development','Native iOS and Android app','planning','2024-03-01','2024-12-31',150000.00,10,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','90b8b64a-b461-4bf4-a568-882ffef0146c','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Data Migration','Migrate data to cloud infrastructure','completed','2023-10-01','2024-01-31',75000.00,100,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ccca67d3-74c1-4898-ba46-00419ca09c8e','2025-07-11 02:24:03','2025-07-11 02:24:03'),('ERP System Upgrade','Upgrade legacy ERP system','active','2024-02-01','2024-08-31',200000.00,40,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','ceefc1df-30ab-4790-bc1c-50210fc8ecd8','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Training Program','Employee training on new systems','on-hold','2024-05-01','2024-07-31',30000.00,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','dc80a539-79c1-419e-888e-dd6124044db2','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Database Optimization','Optimize database performance','completed','2024-01-01','2024-03-31',20000.00,100,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','dd1fed03-2a80-45d5-9124-bba82ebcced6','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Security Audit','Comprehensive security assessment','active','2024-03-15','2024-05-15',25000.00,80,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','e1f9bfd6-1047-40a9-9b10-324c5269e41e','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Office Renovation','Renovate main office space','active','2024-03-01','2024-07-31',80000.00,30,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','e2b69a39-95c7-4f70-ba41-21a572d953a7','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `sales_leads` VALUES ('Lucas Brown','lucas.b@prospect.com',NULL,'Brown Systems','contacted',14000.00,'Interested in custom integration','ca5e4074-a4a4-4b5b-a349-96a2fad07478','2882ba7d-0cfa-4872-ac11-40243340fa2a','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Sofia Martinez','sofia.m@prospect.com',NULL,'Martinez Ltd','contacted',8500.00,'Scheduled for demo next week','ca5e4074-a4a4-4b5b-a349-96a2fad07478','2e132b13-7c93-49a0-8db8-ace87ea22208','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Alex Thompson','alex.t@prospect.com',NULL,'Thompson Corp','new',15000.00,'Interested in our enterprise solution','ca5e4074-a4a4-4b5b-a349-96a2fad07478','342789a6-1bb8-4324-855b-55e43ec25c4a','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Isabella White','isabella.w@prospect.com',NULL,'White & Associates','new',7500.00,'Small business lead','ca5e4074-a4a4-4b5b-a349-96a2fad07478','3bd5f2c7-9406-4cce-ac43-97dd0b824b97','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Nina Patel','nina.p@prospect.com',NULL,'Patel Solutions','new',12000.00,'Referral from existing customer','ca5e4074-a4a4-4b5b-a349-96a2fad07478','553b6ddc-9818-46ef-af41-628c06f60745','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Marcus Johnson','marcus.j@prospect.com',NULL,'Johnson Enterprises','contacted',18000.00,'Comparing with competitors','ca5e4074-a4a4-4b5b-a349-96a2fad07478','55a807c6-e06f-45c9-bd76-4548ec80f567','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Oliver Chen','oliver.c@prospect.com',NULL,'Chen Technologies','qualified',30000.00,'Large enterprise client','ca5e4074-a4a4-4b5b-a349-96a2fad07478','68827dc0-a738-41a5-a6fa-b64898b92778','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Ryan O\'Connor','ryan.o@prospect.com',NULL,'O\'Connor Industries','qualified',25000.00,'Ready to proceed with proposal','ca5e4074-a4a4-4b5b-a349-96a2fad07478','74561b43-96a8-42be-af57-3afcd1b09ef0','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Maya Singh','maya.s@prospect.com',NULL,'Singh Consulting','qualified',22000.00,'Decision maker identified','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ab28b9b9-e4cd-44af-87f6-ea3e098deba8','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Elena Rodriguez','elena.r@prospect.com','','Rodriguez Group','lost',5000.00,'Chose competitor solution','ca5e4074-a4a4-4b5b-a349-96a2fad07478','cd48df92-d9c3-4909-9657-f1d23bca54f8','2025-07-11 02:24:03','2025-07-11 04:15:21');

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

INSERT INTO `suppliers` VALUES ('Office Supplies Co','Sarah Sales','sarah@officesupplies.com','555-1002','456 Supply Ave, Supply Town, ST 67890','ca5e4074-a4a4-4b5b-a349-96a2fad07478','3ab841bc-71bc-46d4-9db3-bc3f3da3539a','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Tech Solutions Inc','John Manager','john@techsolutions.com','555-1001','123 Tech Street, Tech City, TC 12345','ca5e4074-a4a4-4b5b-a349-96a2fad07478','45f5c596-ef62-46be-87fa-ba6556dc43b2','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Hardware Store','Tom Hardware','tom@hardwarestore.com','555-1007','147 Hardware St, Hardware Town, HT 75319','ca5e4074-a4a4-4b5b-a349-96a2fad07478','61a2ebc2-0d92-4f7b-b2aa-4613fef2dd31','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Software Solutions','Amy Software','amy@softwaresolutions.com','555-1006','987 Software Lane, Software City, SC 86420','ca5e4074-a4a4-4b5b-a349-96a2fad07478','636ed6b7-7ae2-4dd7-9f4c-fee80e24192f','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Network Systems','Emma Network','emma@networksystems.com','555-1008','258 Network Ave, Network City, NC 64208','ca5e4074-a4a4-4b5b-a349-96a2fad07478','687c48af-5225-46d0-ab49-b2232f0fe61a','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Electronics Plus','Lisa Electronics','lisa@electronicsplus.com','555-1004','321 Electronics Way, Electronic City, EC 24680','ca5e4074-a4a4-4b5b-a349-96a2fad07478','94331b66-03c5-44f4-a067-571df927013c','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Security Solutions','Rachel Security','rachel@securitysolutions.com','555-1010','741 Security Blvd, Security City, SC 42086','ca5e4074-a4a4-4b5b-a349-96a2fad07478','a7c3a84f-3e85-4ac9-8eca-26684e5f0924','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Furniture World','Mike Furniture','mike@furnitureworld.com','555-1003','789 Furniture Blvd, Furniture City, FC 13579','ca5e4074-a4a4-4b5b-a349-96a2fad07478','c4052016-3bec-4199-a3c8-3c5963520a05','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Cloud Services','Chris Cloud','chris@cloudservices.com','555-1009','369 Cloud Road, Cloud Town, CT 53197','ca5e4074-a4a4-4b5b-a349-96a2fad07478','edb20bc7-1a62-449a-b071-85c545c2b4a6','2025-07-11 02:24:03','2025-07-11 02:24:03'),('Industrial Equipment LLC','David Industrial','david@industrial.com','555-1005','654 Industrial Park, Industrial Town, IT 97531','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ef63a5e9-3fff-4082-9d4e-bef2026beee9','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `purchase_orders` VALUES ('PO-2025-009','edb20bc7-1a62-449a-b071-85c545c2b4a6','delivered',1500.00,'2025-02-15','2025-03-01','Partial delivery accepted','ca5e4074-a4a4-4b5b-a349-96a2fad07478','31fd846d-c3dd-4366-a783-f89568abc557','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-003','61a2ebc2-0d92-4f7b-b2aa-4613fef2dd31','delivered',3200.00,'2025-01-15','2025-02-01','Delivered on time','ca5e4074-a4a4-4b5b-a349-96a2fad07478','370dd514-369b-49ac-b5e3-3782bfd2aa8a','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-002','45f5c596-ef62-46be-87fa-ba6556dc43b2','approved',1800.00,'2025-01-10','2025-01-25','Standard delivery','ca5e4074-a4a4-4b5b-a349-96a2fad07478','39e5e557-cb35-44a6-a4a6-fed4190d99ba','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-008','c4052016-3bec-4199-a3c8-3c5963520a05','approved',3600.00,'2025-02-10','2025-02-25','Quality inspection required','ca5e4074-a4a4-4b5b-a349-96a2fad07478','41343c4c-edb9-4d0e-9066-36f889490923','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-001','3ab841bc-71bc-46d4-9db3-bc3f3da3539a','pending',2500.00,'2025-01-05','2025-01-20','Urgent delivery required','ca5e4074-a4a4-4b5b-a349-96a2fad07478','4388683b-80f6-4107-874a-94a877da3079','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-010','ef63a5e9-3fff-4082-9d4e-bef2026beee9','pending',5200.00,'2025-02-20','2025-03-05','Large order - special handling','ca5e4074-a4a4-4b5b-a349-96a2fad07478','6545834b-73e1-4efa-a336-4d8c3692e1eb','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-007','a7c3a84f-3e85-4ac9-8eca-26684e5f0924','pending',2800.00,'2025-02-05','2025-02-20','Payment terms: Net 30','ca5e4074-a4a4-4b5b-a349-96a2fad07478','d9b5b5cc-65b2-43f0-9458-2aea9a558116','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-005','687c48af-5225-46d0-ab49-b2232f0fe61a','approved',4500.00,'2025-01-25','2025-02-10','Bulk order discount applied','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ea20bf7e-11b4-4007-9a63-562dd0d05c85','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-006','94331b66-03c5-44f4-a067-571df927013c','delivered',1200.00,'2025-02-01','2025-02-15','Express delivery','ca5e4074-a4a4-4b5b-a349-96a2fad07478','f521d690-b2ff-4cb5-b0d8-6decc420ab17','2025-07-11 02:24:03','2025-07-11 02:24:03'),('PO-2025-004','636ed6b7-7ae2-4dd7-9f4c-fee80e24192f','pending',950.00,'2025-01-20','2025-02-05','Awaiting approval','ca5e4074-a4a4-4b5b-a349-96a2fad07478','fa58bb4a-f910-4574-971d-3a11d4a6d65c','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `system_settings` VALUES (1,0,0,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','d61b5060-9920-4c24-984e-6f704f071fd3','2025-07-11 09:24:03','2025-07-11 09:24:03');

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

INSERT INTO `transactions` VALUES ('0c1be347-b753-465b-a44a-b2b040349fb5','income',2350.8,'Sample transaction 10','2025-06-14 09:24:03','Hardware',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('3c353e8c-39d3-47fb-819e-d08a3cd1ed2f','expense',1100.13,'Sample transaction 5','2025-06-29 09:24:03','Office Supplies','REF-2025-104','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('4554b948-1816-4e18-b8c4-cc2a7438e66a','transfer',1350.56,'Sample transaction 6','2025-06-26 09:24:03','Marketing',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('63a578a1-afa5-4cce-a4bd-6f8902df9b88','income',100.82,'Sample transaction 1','2025-07-11 09:24:03','Sales','REF-2025-100','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('7851ed3c-9ee1-4aaa-b888-ccf81b265b5a','transfer',600.22,'Sample transaction 3','2025-07-05 09:24:03','Rent','REF-2025-102','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('c3cc3442-707e-4063-ae99-350d0937aa48','transfer',2100.27,'Sample transaction 9','2025-06-17 09:24:03','Software','REF-2025-108','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('ebcef54e-c42f-4293-9849-9bef978711bb','expense',350.02,'Sample transaction 2','2025-07-08 09:24:03','Salary',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('ec9bbae3-2c9d-47f6-8f02-fe532bcb52ea','income',1600.88,'Sample transaction 7','2025-06-23 09:24:03','Travel','REF-2025-106','2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('ed211e21-6036-4216-93f4-7c92a0122797','expense',1850.06,'Sample transaction 8','2025-06-20 09:24:03','Consulting',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478'),('f6641fff-fb46-4b5c-a2f2-fd4d14cb3001','income',850.35,'Sample transaction 4','2025-07-02 09:24:03','Utilities',NULL,'2025-07-11 09:24:03','2025-07-11 09:24:03','ca5e4074-a4a4-4b5b-a349-96a2fad07478');

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

INSERT INTO `user_preferences` VALUES ('ca5e4074-a4a4-4b5b-a349-96a2fad07478',1,0,1,1,0,0,0,'en','utc',0,0,0,0,NULL,NULL,'bb62ed4a-cdf1-4341-a95d-2fb1bddfd35c','2025-07-11 02:24:20','2025-07-11 02:24:20');

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

INSERT INTO `users` VALUES ('user2@erpnew.com','$2b$12$dvjmFlFOrPfjLc1i7ZzmZuOVEdtBIBJzku2k63D8JrOdSeWsRkbVi',1,1,'984c5298-0db6-4da0-b3e9-3f6c968c3167','2025-07-11 02:24:03','2025-07-11 02:24:03'),('admin@erpnew.com','$2b$12$OzhShWeOHAmVRt2.swBLNerSBLbklXyinxWqwSv5qY7XoBAuW75BG',1,1,'ca5e4074-a4a4-4b5b-a349-96a2fad07478','2025-07-11 02:24:02','2025-07-11 02:24:02'),('user1@erpnew.com','$2b$12$TBYWKzQqpMrE8t15783N8Oti2nIijMZb/86S7u0r5EcofUpXQaZSG',1,1,'d862b0a9-c5cc-4454-8d97-2197497e523b','2025-07-11 02:24:03','2025-07-11 02:24:03');

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

INSERT INTO `work_orders` VALUES ('WO-2024-003','Mobile App Feature',2,'planning','2024-03-01','2024-04-30','ca5e4074-a4a4-4b5b-a349-96a2fad07478','109026b2-08c1-4c36-a306-d28c82f70453','2025-07-11 02:24:03','2025-07-11 02:24:03'),('WO-2024-006','Security Patch',1,'active','2024-03-01','2024-03-15','ca5e4074-a4a4-4b5b-a349-96a2fad07478','2acc4ba9-fadc-4c99-8d5f-9a284858f9fd','2025-07-11 02:24:03','2025-07-11 04:15:35'),('WO-2024-002','Website Landing Page',3,'in-progress','2024-02-01','2024-03-15','ca5e4074-a4a4-4b5b-a349-96a2fad07478','2c338b18-239b-419a-83bb-0298d1910168','2025-07-11 02:24:03','2025-07-11 02:24:03'),('WO-2024-010','Data Migration Script',1,'active','2024-04-15','2024-06-01','ca5e4074-a4a4-4b5b-a349-96a2fad07478','42ed2b4e-e383-4f7e-ab25-cc7d6bac8498','2025-07-11 02:24:03','2025-07-11 04:15:37'),('WO-2024-009','Performance Optimization',1,'completed','2024-02-01','2024-03-01','ca5e4074-a4a4-4b5b-a349-96a2fad07478','5e657ab3-7bca-4b13-80f5-1a0e68e4b94e','2025-07-11 02:24:03','2025-07-11 02:24:03'),('WO-2024-001','Custom Software Module',1,'completed','2024-01-01','2024-02-01','ca5e4074-a4a4-4b5b-a349-96a2fad07478','856d9d92-a1a2-4e9b-91dc-8882c27eef4f','2025-07-11 02:24:03','2025-07-11 02:24:03'),('WO-2024-005','API Integration',1,'in-progress','2024-02-15','2024-04-01','ca5e4074-a4a4-4b5b-a349-96a2fad07478','ac131185-b53f-40b6-8e91-5e2e8ff31184','2025-07-11 02:24:03','2025-07-11 02:24:03'),('WO-2024-007','User Training Material',10,'planning','2024-04-01','2024-05-31','ca5e4074-a4a4-4b5b-a349-96a2fad07478','c6cae68a-98b0-4766-8bb6-960965f6bf6f','2025-07-11 02:24:03','2025-07-11 02:24:03'),('WO-2024-008','System Backup',1,'in-progress','2024-03-15','2024-04-15','ca5e4074-a4a4-4b5b-a349-96a2fad07478','cd5710ce-9549-49d8-a49a-70d38515e71b','2025-07-11 02:24:03','2025-07-11 02:24:03'),('WO-2024-004','Database Report',5,'completed','2024-01-15','2024-02-15','ca5e4074-a4a4-4b5b-a349-96a2fad07478','fc87f21d-2d06-4c13-9c89-60711f91d3b8','2025-07-11 02:24:03','2025-07-11 02:24:03');
