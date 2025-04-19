# Link-Based Task Approval App

A full-stack web application where managers can create tasks, assign them to users via email, and receive approvals or rejections through unique tokenized email links.

## ✨ Features

### 🎯 Core Features
- **Manager Dashboard** – View, create, edit, and delete tasks
- **Task Assignment** – Assign tasks to users via email
- **Tokenized Approval Links** – Secure, single-use links for task approval/rejection
- **Email Notifications** – Automated email system for task assignments and responses

### 🔒 Security Features
- **Unique Tokens** – UUID-based tokens for each task assignment
- **Single-Use Links** – Links expire after use
- **Token Expiration** – Optional token expiration feature

## 🔧 Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Express.js API
- **Database:** PostgreSQL with Drizzle ORM
- **Email Service:** SendGrid
- **Authentication:** Local Authentication
- **Deployment:** AWS (ECS, RDS, Route53)
- **Infrastructure:** Terraform

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- SendGrid Account
- Terraform CLI

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd link-based-task-approval-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/task_approval"
JWT_SECRET="your-secret-key"
AWS_REGION="your-aws-region"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="your-verified-sender@domain.com"
```

4. Run database migrations
```bash
npm run db:migrate
```

5. Start the development server
```bash
npm run dev
```

## 📝 Project Structure

```
├── api/                  # Express.js API
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   └── utils/           # Utility functions
├── app/                 # Next.js frontend
│   ├── src/            # Source files
│   │   ├── components/ # React components
│   │   ├── lib/        # Utility functions
│   │   └── types/      # TypeScript definitions
│   └── public/         # Static assets
├── terraform/          # Infrastructure as Code
│   ├── modules/        # Reusable Terraform modules
│   └── environments/   # Environment-specific configs
└── drizzle/           # Database migrations and schema
```

## 🏗️ Infrastructure

The application is deployed on AWS using Terraform for infrastructure management:

- **ECS (Elastic Container Service)** – Hosts the Express.js API and Next.js frontend
- **RDS (Relational Database Service)** – PostgreSQL database instance
- **Route 53** – Domain management and DNS configuration
- **SES (Simple Email Service)** – Email delivery service
- **VPC** – Network isolation and security
- **ALB (Application Load Balancer)** – Traffic distribution
- **CloudWatch** – Logging and monitoring

## 📧 SendGrid Setup

1. **Create SendGrid Account**
   - Sign up at [SendGrid](https://signup.sendgrid.com/)
   - Verify your email address

2. **Create API Key**
   - Go to Settings → API Keys
   - Create a new API Key with "Full Access" or "Restricted Access" (Mail Send only)
   - Save the API key securely

3. **Verify Sender**
   - Go to Settings → Sender Authentication
   - Choose between:
     - Single Sender Verification (quick setup)
     - Domain Authentication (recommended for production)
   - Follow the verification steps

4. **Configure Email Templates**
   - Go to Email API → Dynamic Templates
   - Create templates for:
     - Task Assignment
     - Approval Request
     - Task Status Updates

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📬 Contact

For any questions or support, please open an issue in the repository.
