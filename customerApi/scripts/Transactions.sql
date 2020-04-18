USE [CustomerDB]
GO

ALTER TABLE [dbo].[Transactions] DROP CONSTRAINT [FK_Transactions_CustomerId]
GO

/****** Object:  Table [dbo].[Transactions]    Script Date: 4/17/2020 4:32:22 PM ******/
DROP TABLE [dbo].[Transactions]
GO

/****** Object:  Table [dbo].[Transactions]    Script Date: 4/17/2020 4:32:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Transactions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IsActive] [bit] NULL,
	[CustomerId] [int] NULL,
	[PlanId] [int] NULL,
	[PurchaseDate] [datetime] NULL,
	[AmountPaid] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [FK_Transactions_CustomerId] FOREIGN KEY([CustomerId])
REFERENCES [dbo].[Customers] ([Id])
GO

ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [FK_Transactions_CustomerId]
GO


