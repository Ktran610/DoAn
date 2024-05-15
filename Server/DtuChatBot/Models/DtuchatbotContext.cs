using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DtuChatBot.Models;

public partial class DtuchatbotContext : DbContext
{
    public DtuchatbotContext()
    {
    }

    public DtuchatbotContext(DbContextOptions<DtuchatbotContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Chat> Chats { get; set; }

    public virtual DbSet<ChatDetail> ChatDetails { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-B1DIPGC;Database=dtuchatbot;Trusted_Connection=true;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Account__3214EC07AE7631C3");

            entity.ToTable("Account");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Account__RoleId__4BAC3F29");
        });

        modelBuilder.Entity<Chat>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Chat__3214EC07A2EB3A21");

            entity.ToTable("Chat");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.AccountId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(255);

            entity.HasOne(d => d.Account).WithMany(p => p.Chats)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("FK__Chat__AccountId__4E88ABD4");
        });

        modelBuilder.Entity<ChatDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ChatDeta__3214EC07FD1B1945");

            entity.ToTable("ChatDetail");

            entity.Property(e => e.Id)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Answer).HasColumnType("ntext");
            entity.Property(e => e.ChatId)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Question).HasColumnType("ntext");

            entity.HasOne(d => d.Chat).WithMany(p => p.ChatDetails)
                .HasForeignKey(d => d.ChatId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChatDetai__ChatI__5165187F");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE1A7816F442");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
