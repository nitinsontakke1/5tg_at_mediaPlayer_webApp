﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AudioPlayer.EntityModel
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class AudioTestDBEntities : DbContext
    {
        public AudioTestDBEntities()
            : base("name=AudioTestDBEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Playlist> Playlists { get; set; }
        public virtual DbSet<Log> Logs { get; set; }
        public virtual DbSet<Audio> Audios { get; set; }
        public virtual DbSet<Playlist1> Playlists1 { get; set; }
    }
}
