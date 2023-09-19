using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class prodchanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Dictionary<string, string>>(
                name: "SubSchema",
                table: "Subcategories",
                type: "hstore",
                nullable: true,
                oldClrType: typeof(Dictionary<string, string>),
                oldType: "hstore");

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Subcategories",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<Dictionary<string, string>>(
                name: "Schema",
                table: "Categories",
                type: "hstore",
                nullable: true,
                oldClrType: typeof(Dictionary<string, string>),
                oldType: "hstore");

            migrationBuilder.AddColumn<string>(
                name: "Website",
                table: "Categories",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Website",
                table: "Subcategories");

            migrationBuilder.DropColumn(
                name: "Website",
                table: "Categories");

            migrationBuilder.AlterColumn<Dictionary<string, string>>(
                name: "SubSchema",
                table: "Subcategories",
                type: "hstore",
                nullable: false,
                oldClrType: typeof(Dictionary<string, string>),
                oldType: "hstore",
                oldNullable: true);

            migrationBuilder.AlterColumn<Dictionary<string, string>>(
                name: "Schema",
                table: "Categories",
                type: "hstore",
                nullable: false,
                oldClrType: typeof(Dictionary<string, string>),
                oldType: "hstore",
                oldNullable: true);
        }
    }
}
