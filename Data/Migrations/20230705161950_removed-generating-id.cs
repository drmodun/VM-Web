using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class removedgeneratingid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacitons_Products_ProductId",
                table: "Transacitons");

            migrationBuilder.DropForeignKey(
                name: "FK_Transacitons_Users_UserId",
                table: "Transacitons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transacitons",
                table: "Transacitons");

            migrationBuilder.RenameTable(
                name: "Transacitons",
                newName: "Transactions");

            migrationBuilder.RenameIndex(
                name: "IX_Transacitons_UserId",
                table: "Transactions",
                newName: "IX_Transactions_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Transacitons_ProductId",
                table: "Transactions",
                newName: "IX_Transactions_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Products_ProductId",
                table: "Transactions",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Users_UserId",
                table: "Transactions",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Products_ProductId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Users_UserId",
                table: "Transactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transactions",
                table: "Transactions");

            migrationBuilder.RenameTable(
                name: "Transactions",
                newName: "Transacitons");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_UserId",
                table: "Transacitons",
                newName: "IX_Transacitons_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_ProductId",
                table: "Transacitons",
                newName: "IX_Transacitons_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transacitons",
                table: "Transacitons",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacitons_Products_ProductId",
                table: "Transacitons",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transacitons_Users_UserId",
                table: "Transacitons",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
