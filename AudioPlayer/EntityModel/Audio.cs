//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Audio
    {
        public int ID { get; set; }
        public string UID { get; set; }
        public string Title { get; set; }
        public string Filename { get; set; }
        public Nullable<int> FileSize { get; set; }
        public string FileType { get; set; }
        public string FilePath { get; set; }
        public Nullable<System.TimeSpan> Duration { get; set; }
    }
}
